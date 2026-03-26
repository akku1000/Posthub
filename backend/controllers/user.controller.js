import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { redis } from "../lib/redis.js";
import User from "../models/user.models.js";

dotenv.config();

const generateToken = async (userid) => {
  const accessToken = jwt.sign({ userid }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userid }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

const storerefreshToken = async (userid, refreshToken) => {
  await redis.set(`refresh_token:${userid}`, refreshToken, {
    ex: 7 * 24 * 60 * 60, // 7 days
  });
  //7days
};

const setCookies = async (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const signup = async (req, res) => {
  /*
     logic for signup
     grab data req.data
     check name,email,password should there
     check already exist
     save in db
    */

  try {
    const { name, email, password} = req.body;
    //  console.log(name,email,password);

    if (!name|| !email  || !password) {
     return res.status(400).json({ message: "please enter all the fields" });
    }

    const userexist = await User.findOne({email});
  // console.log("J")
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password});

    //user authenticate

    const { accessToken, refreshToken } = await generateToken(user._id);
    await storerefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "user created successfully",
    });
  } catch (error) {
    console.log("signup controller not working");
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password} = req.body;
    console.log(email,password);
    if (!email || !password ) {
      return res.status(400).json({ message: "please enter all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const pass = await user.iscomparePassword(password);
    if (!pass) {
      return res.status(400).json({ message: "password not matched" });
    }
    const { accessToken, refreshToken } = await generateToken(user._id);
    await storerefreshToken(user._id, refreshToken);
    setCookies(res, accessToken, refreshToken);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    //console.log(refresh_token)
    if (refresh_token) {
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
      );
      //console.log("dec:",decoded)
      await redis.del(`refresh_token:${decoded.userid}`);

      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.json({ message: "logout successfully" });
    }
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    // console.log(req.cookies)
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }
    const decode = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const storedtoken = await redis.get(`refresh_token:${decode.userid}`);

    if (!storedtoken || storedtoken !== refreshToken) {
      return res.status(401).json({ message: "invalid token" });
    }

    const accessToken = jwt.sign(
      { userid: decode.userid },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // prevent xss attack
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", //prevents CSRF attack request forgery attack
      maxAge: 15 * 60 * 1000,
    });
    res.json({ message: "token refreshed" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getprofile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { signup, login, logout, refreshToken, getprofile };