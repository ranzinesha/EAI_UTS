const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

// SWAGGER CONFIG
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Healthcare API',
      version: '1.0.0',
      description: 'API Documentation for Smart Healthcare System'
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
 *         description: List of all patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   age:
 *                     type: integer
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               age:
 *                 type: integer
 *                 example: 35
 *     responses:
 *       200:
 *         description: Patient added successfully
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
 *         description: Patient data
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
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
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               age:
 *                 type: integer
 *                 example: 30
 *     responses:
 *       200:
 *         description: Patient updated
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Patient deleted
 */

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   specialty:
 *                     type: string
 *   post:
 *     summary: Add a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialty
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. Smith
 *               specialty:
 *                 type: string
 *                 example: Cardiology
 *     responses:
 *       200:
 *         description: Doctor added successfully
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dr. Johnson
 *               specialty:
 *                 type: string
 *                 example: Neurology
 *     responses:
 *       200:
 *         description: Doctor updated
 *   delete:
 *     summary: Delete doctor
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Doctor deleted
 */

/**
 * @swagger
 * /api/doctors/{id}/availability:
 *   get:
 *     summary: Check doctor availability
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
 *         description: Doctor availability status
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
 * /api/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   patient_id:
 *                     type: integer
 *                   doctor_id:
 *                     type: integer
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - doctor_id
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 example: 1
 *               doctor_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Appointment created
 *       400:
 *         description: Invalid patient or doctor ID
 *       500:
 *         description: Service error
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
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *         description: List of all records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   patient_id:
 *                     type: integer
 *                   diagnosis:
 *                     type: string
 *   post:
 *     summary: Add a new medical record
 *     tags: [Records]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patient_id
 *               - diagnosis
 *             properties:
 *               patient_id:
 *                 type: integer
 *                 example: 1
 *               diagnosis:
 *                 type: string
 *                 example: Hypertension
 *     responses:
 *       200:
 *         description: Record added
 */

/**
 * @swagger
 * /api/records/{id}:
 *   get:
 *     summary: Get medical record by ID
 *     tags: [Records]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Record data
 *   put:
 *     summary: Update medical record
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
 *   delete:
 *     summary: Delete medical record
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

/**
 * @swagger
 * /api/history:
 *   get:
 *     summary: Get full history (patient, doctor, appointment, diagnosis)
 *     tags: [Records]
 *     responses:
 *       200:
 *         description: Combined history data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   patient_name:
 *                     type: string
 *                   doctor_name:
 *                     type: string
 *                   appointment_id:
 *                     type: integer
 *                   diagnosis:
 *                     type: string
 */

// ROUTING KE SERVICES
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

// Fixed: /api/history was missing — proxied to medical-record-service
app.use('/api/history', createProxyMiddleware({
  target: 'http://localhost:3004',
  changeOrigin: true
}));

// RUN SERVER
app.listen(3000, () => {
  console.log('API Gateway running on port 3000');
  console.log('Swagger docs: http://localhost:3000/api-docs');
});