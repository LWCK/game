import './App.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import React from 'react'

const App = () => {


  const [gameList, setGameList] = React.useState<any>({
    id: 1,
    rule: "Pour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettrePour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettrePour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettrePour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettrePour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettrePour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettre.",
    step: 1
  }
  )

  const [begin, setBegin] = React.useState<boolean>(true)
  const [rule, setRule] = React.useState<boolean>(false)
  const [game, setGame] = React.useState<boolean>(false)

  const startGame = () => {
    setBegin(false)
    setRule(true)
  }

  const imgGame = () => {
    setGame(true)
    setRule(false)
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12} className="gif-orientation text-center">
            <Image src="/src/assets/images/turnscreen.gif" alt="" />
            <h2 className="title">
              Pour commencer, <br />
              veuillez pivoter le téléphone
            </h2>
          </Col>
        </Row>
        {begin &&
          <Row className='only-landscape main-story'>
            <Col className="offset-6 col-6 main">
              <span className="text-center main-bg bg px-5 py-3">
                <h2 className="title">
                  Le trésor du legéndaire <br />
                  pirate la buse
                </h2>
                <Button onClick={() => startGame()} variant='' className="btn text px-2 bounce">Commencer le jeu</Button>
              </span>
            </Col>
          </Row>
        }
        {rule &&
          <>

            <div className="_test0 text-end">
              <div className='_test1'>
                <div >
                  <Image className='char-img' src="/src/assets/images/char.png" alt="" />
                </div>
              </div>

              <div className='_test2'>
                <div className='_test3'>
                  <h3 className='text-start'>Règle du jeu</h3>
                  <p className='text text-start'>{gameList.rule}</p>
                </div>
                <Button onClick={() => imgGame()} variant='' className='btn-next bounce'><Image className='img-in-btn' src="/src/assets/images/sword.png" alt="" /></Button>
              </div>
            </div>

            {/* <Row className='only-landscape bg text-bg intro-rules'>
              <Col className='' xs={3}>
                <Image className='char-img' src="/src/assets/images/char.png" alt="" />
              </Col>
              <Col xs={9} className='text-end py-3 px-3'>
                <h3 className='text-start'>Règle du jeu</h3>
                <p className='text text-start'>{gameList.rule}</p>
                <Button onClick={() => imgGame()} variant='' className='btn-next bounce'><Image className='img-in-btn' src="/src/assets/images/sword.png" alt="" /></Button>
              </Col>
            </Row> */}
          </>
        }
      </Container>

      {
        game &&
        <Container>
          <Row>
            <Col className='text-center'>
              <Image className='only-landscape game-img' src='/src/assets/images/game1.png' />
            </Col>
          </Row>
        </Container>

      }


    </>
  )
}


export default App
