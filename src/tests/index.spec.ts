import supertest from 'supertest'
import app from '../index'

// create a request object
const request = supertest(app)

describe('Testing endpoints responses', () => {
  it('Testing our main route endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })

  it('Testing our resize endpoint', async () => {
    const response = await request.get('/resize')
    expect(response.status).toBe(200)
  })
})
