import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";


export const registerController = async (req,res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body;
        if(!name){
            return res.send({message:'SEU NOME E OBRIGATORIO'});
        }
        if(!email){
            return res.send({message:'SEU EMAIL E OBRIGATORIO'});
        }
        if(!password){
            return res.send({message:'SUA SENHA E OBRIGATORIO'});
        }
        if(!phone){
            return res.send({message:'SEU TELEFONE E OBRIGATORIO'});
        }
        if(!address){
            return res.send({message:'SEU ENDERECO E OBRIGATORIO'});
        }
        if(!answer){
            return res.send({message:'SEA RESPOSTA  E OBRIGATORIO'});
        }

        const existinguser = await userModel.findOne({email});
        if(existinguser){
            return res.status(200).send({
                success:false,
                message:'VOCE JA E CADASTRADO NO SISTEMA , FACA SEU LOGIN',
            });
        }
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            answer
        }).save();

        res.status(201).send({
            success:true,
            message:"USUARIO CADASTRADO COM SUCESSO",
            user,
        });
        
    } catch (error) {
        console.log(error); 
        res.status(500).send({
            success:false,
            message:"ERRO AO CADASTRAR",
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
          message: "INVALIDO EMAIL OU SENHA",
        });
      }
      //check user
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
      //token
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
          adddress: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "ERRO DE LOGIN",
        error,
      });
    }
  };

export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "SEU EMAIL E OBRIGATORIO" });
      }
      if (!answer) {
        res.status(400).send({ message: "SUA PERGUNTAS E OBRIGATORIO" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "SUA NOVA SENHA E OBRIGATORIA" });
      }
   
      const user = await userModel.findOne({ email, answer });
     
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "EMAIL OU RESPOSTA ERRADAS",
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
        message: "OCORREU UM ERRO",
        error,
      });
    }
  };
  

  export const testController = (req, res) => {
    try {
      res.send("ROTAS PROTEGIDAS");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };