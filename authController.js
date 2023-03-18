import userModel from "../models/userModel.js";


import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";



export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
  
    if (!name) {
      return res.send({ error: "NOME OBRIGATORIO" });
    }
    if (!email) {
      return res.send({ message: "EMAIL OBRIGATORIO" });
    }
    if (!password) {
      return res.send({ message: "SENHA OBRIGATORIO" });
    }
    if (!phone) {
      return res.send({ message: "TELEFONE OBRIGATORIO" });
    }
    if (!address) {
      return res.send({ message: "ENDERECO OBRIGATORIO" });
    }
    if (!answer) {
      return res.send({ message: "A RESPOSTA E OBRIGATORIO" });
    }
 
    const exisitingUser = await userModel.findOne({ email });
 
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "VOCE JA ESTA CADASTRADO FAVOR FAZER O LOGIN",
      });
    }
   
    const hashedPassword = await hashPassword(password);
  
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "USUARIO CADASTRADO COM SUCESSO",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR AO CADASTRAR",
      error,
    });
  }
};


export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "EMAIL OU SENHA ERRADAS",
      });
    }
   
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "ESTE EMAIL NAO ESTA CADASTRADO",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "SENHA INVALIDA",
      });
    }
  
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "LOGIN COM SUCESSO",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR NO LOGIN",
      error,
    });
  }
};



export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "EMIAL OBRIGATORIO" });
    }
    if (!answer) {
      res.status(400).send({ message: "RESPOSTA OBRIGATORIO" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "NOVA SENHA OBRIGATORIO" });
    }
   
    const user = await userModel.findOne({ email, answer });
 
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "SEU EMAIL OU RESPOSTA ESTA ERRADA",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "SENHA RECOPERADA COM SUCESSO",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR",
      error,
    });
  }
};


export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};


export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
   
    if (password && password.length < 6) {
      return res.json({ error: "SENHA OBRIGATORIA E TEM QUE TER NO MINIMO 6 CARACTERES" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "PERFIL ATUALIZADO COM SUCESSO",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "ERROR AO ATUALIZAR SEU PERFIL",
      error,
    });
  }
};


export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR AO OBTER SEU PEDIDO",
      error,
    });
  }
};

export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERROR AO CARREGAR SEU PEDIDO",
      error,
    });
  }
};


export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "ERRO AO ATUALIZAR SEU PEDIDO",
      error,
    });
  }
};