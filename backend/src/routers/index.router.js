import { Router } from "express";
const routerIndex = Router();
import userModel from '../models/users.model.js';

// GET all employees
routerIndex.get('/empleados', async (req, res) => {
  try {
    const documentos = await userModel.find();
    res.status(200).json(documentos);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Error fetching employees" });
  }
}); 

// GET employee by ID
routerIndex.get('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await userModel.findOne({ id });
    
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({ error: "Error fetching employee" });
  }
});

// POST create new employee
routerIndex.post('/empleados', async (req, res) => {
  try {
    const { id, nombre, puesto } = req.body;
    
    // Check if employee with this ID already exists
    const existingEmployee = await userModel.findOne({ id });
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee with this ID already exists" });
    }
    
    // Create new employee
    const newEmployee = new userModel({
      id,
      nombre,
      puesto
    });
    
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Error creating employee" });
  }
});

// PUT update employee
routerIndex.put('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, puesto } = req.body;
    
    const updatedEmployee = await userModel.findOneAndUpdate(
      { id },
      { nombre, puesto },
      { new: true }
    );
    
    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Error updating employee" });
  }
});

// DELETE employee
routerIndex.delete('/empleados/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedEmployee = await userModel.findOneAndDelete({ id });
    
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Error deleting employee" });
  }
});

export default routerIndex;