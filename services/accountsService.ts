import { Request, Response } from "express";
import firebase from "../config/firebase";
import AccountResponse from "../models/response/accountResponse";

const accountCollection = firebase.collection("students");

export const getAllmember = async (req: Request, res: Response) => {
  console.log(`getAllAccount start time ${new Date().toISOString()}`);

  try {
    const data = await accountCollection.get();

    const response: AccountResponse[] = [];

    data.forEach((doc) => {
      response.push({
        id: doc.id,
        id_std: doc.data().id_std,
        name: doc.data().name,
        lastname: doc.data().lastname,
        address: doc.data().address,
        phoneno: doc.data().phoneno,
        gpa: doc.data().gpa,
        major: doc.data().major,
        
      });
    });

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "get all account success",
      },
      data: response,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const createmember = async (req: Request, res: Response) => {
  console.log(`createmember start time ${new Date().toISOString()}`);

  try {
    const data = req.body;

    await accountCollection.doc().set(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "create account success",
      },
      data: null,
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const updatemember = async (req: Request, res: Response) => {
  console.log(`updatemember start time ${new Date().toISOString()}`);

  try {
    const data = req.body;
    const id = req.params.id;

    await accountCollection.doc(id).update(data);

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "update account success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};

export const deletemember = async (req: Request, res: Response) => {
  console.log(`deletemember start time ${new Date().toISOString()}`);

  try {
    const id = req.params.id;

    await accountCollection.doc(id).delete();

    return res.status(200).json({
      status: {
        code: 200,
        message: "success",
        description: "delete account success",
      },
      data: {
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e: any) {
    return res.status(400).json({
      status: {
        code: 400,
        message: e,
        description: "Bad Request",
      },
      data: null,
    });
  }
};
