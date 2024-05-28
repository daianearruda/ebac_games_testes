import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom/extend-expect'

import Produtos from '..'
import { renderizaComProvider } from '../../../utils/tests'
import { screen, waitFor } from '@testing-library/react'

const mocks = [
  {
    id: 1,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windows', 'PS5', 'Xbox Series'],
    preco: 180.9,
    precoAntigo: 250.9,
    titulo: 'Elden Ring'
  },
  {
    id: 2,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windows', 'Xbox Series'],
    preco: 80.9,
    precoAntigo: 150.9,
    titulo: 'Hogwarts Legacy'
  },
  {
    id: 3,
    categoria: 'Aventura',
    imagem: '',
    plataformas: ['Xbox Series'],
    preco: 190.9,
    precoAntigo: 210.9,
    titulo: 'It takes two'
  },
  {
    id: 4,
    categoria: 'RPG',
    imagem: '',
    plataformas: ['windows', 'PS5'],
    preco: 180.9,
    precoAntigo: 250.9,
    titulo: 'Far Cry 5'
  }
]

const server = setupServer(
  rest.get('http://localhost:4000/produtos', (req, res, cont) => {
    return res(cont.json(mocks))
  })
)

describe('Testes para o container de Produtos', () => {
  beforeAll(() => server.listen)
  afterEach(() => server.listHandlers())
  afterAll(() => server.close)

  test('Deve renderizar corretamente com o texto de carregamento', () => {
    renderizaComProvider(<Produtos />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  test('Deve renderizar corretamente com a listagem de jogos', async () => {
    const { debug } = renderizaComProvider(<Produtos />)
    await waitFor(() => {
      debug()
      expect(screen.getByText('Hogwarts Legacy')).toBeInTheDocument()
    })
  })
})
