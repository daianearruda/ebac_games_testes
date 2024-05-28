import { fireEvent, screen } from '@testing-library/react'
import Produto from '..'
import { renderizaComProvider } from '../../../utils/tests'

const jogo = {
  id: 3,
  categoria: 'RPG',
  imagem: '',
  plataformas: ['windows', 'PS5', 'Xbox Series'],
  preco: 180.9,
  precoAntigo: 250.9,
  titulo: 'Legacy'
}

describe('Testes para componente Produto', () => {
  test('Deve renderizar corretamente', () => {
    renderizaComProvider(<Produto game={jogo} />)
    expect(screen.getByText('Legacy')).toBeInTheDocument()
  })

  test('Deve adicionar um item ao carrinho', () => {
    const { store } = renderizaComProvider(<Produto game={jogo} />)
    const botao = screen.getByTestId('btn-adicionar-produto')
    fireEvent.click(botao)

    expect(store.getState().carrinho.itens).toHaveLength(1)
  })
})
