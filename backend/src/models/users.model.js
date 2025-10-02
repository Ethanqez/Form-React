import mongoose from 'mongoose';

const userModelName = "user";
const userModelSchema = new mongoose.Schema({
    id : Number,
    nombre: String,
    puesto: String
});
const userModelCollection = "empleados";

export const userModel = mongoose.model(userModelName, userModelSchema, userModelCollection);

export default userModel;