const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

app = express();

const PORT = process.env.PORT || 3344;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });