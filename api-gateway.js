const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 SWAGGER CONFIG
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare API',
      version: '1.0.0',
      description: 'API Documentation for Healthcare System'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   - name: Patients
 *   - name: Doctors
 *   - name: Appointments
 *   - name: Records
 */

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Add patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Patient added
 */
/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Success
 */
/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Add doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor added
 */
/**
 * @swagger
 * /api/doctors/{id}:
 *   put:
 *     summary: Update doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialty:
 *                 type: string
 *     responses:
 *       200:
 *         description: Doctor updated
 *
 *   delete:
 *     summary: Delete doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted
 */
/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Create appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Appointment created
 */
/**
 * @swagger
 * /api/doctors/{id}/availability:
 *   get:
 *     summary: Get doctor availability
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor availability
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctor_id:
 *                   type: integer
 *                 available:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
/**
 * @swagger
 * /api/appointments/{id}:
 *   put:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               doctor_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Appointment updated
 *
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted
 */
/**
 * @swagger
 * /api/records:
 *   get:
 *     summary: Get all medical records
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Success
 *   post:
 *     summary: Add medical record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               diagnosis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record added
 */
/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get full history (patient, doctor, appointment, record)
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Success
 */

/**
 * @swagger
 * /api/records:
 *   post:
 *     summary: Add medical record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               diagnosis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record added
 */

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Get record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *
 *   put:
 *     summary: Update record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patient_id:
 *                 type: integer
 *               diagnosis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated
 *
 *   delete:
 *     summary: Delete record
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record deleted
 */

// 🔁 ROUTING KE SERVICE
app.use('/api/patients', createProxyMiddleware({
  target: 'http://localhost:3001',
  changeOrigin: true
}));

app.use('/api/doctors', createProxyMiddleware({
  target: 'http://localhost:3002',
  changeOrigin: true
}));

app.use('/api/appointments', createProxyMiddleware({
  target: 'http://localhost:3003',
  changeOrigin: true
}));

app.use('/api/records', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true
}));


// 🚀 RUN SERVER
app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
});