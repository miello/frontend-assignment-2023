import supertest from 'supertest'
import app from '../express'

const request = supertest.agent(app)

export default request
