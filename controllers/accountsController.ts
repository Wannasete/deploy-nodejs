import exports from "express";
import {
  createmember,
  deletemember,
  getAllmember,
  updatemember,
} from "../services/accountsService";

const Controller = exports.Router();

Controller.get("/registrar", getAllmember);
Controller.post("/registrar", createmember);
Controller.patch("/registrar/:id", updatemember);
Controller.delete("/registrar/:id", deletemember);

export default Controller;
