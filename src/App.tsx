import './App.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import React from 'react'

const App = () => {


  const [game, setGame] = React.useState<any>({
    id: 1,
    rule: "Pour commencer, déchiffrez le nom du rayon où vous rendre. Chaque élément correspond à une lettre.",
    step: 1
  }
  )

  const [start, setStart] = React.useState<boolean>(false)

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
        {start ?
          <Row className='only-landscape bg text-bg intro-rules'>
            <Col className='' xs={3}>
              <Image className='char-img' src="/src/assets/images/char.png" alt="" />
            </Col>
            <Col xs={9} className='text-end py-3'>
              <h3 className='text-start'>Règle du jeu</h3>
              <p className='text text-start'>{game.rule}</p>
              <Button variant='' className='btn-next bounce'><Image className='img-in-btn' src="/src/assets/images/sword.png" alt="" /></Button>
            </Col>
          </Row>


          :
          <Row className='only-landscape main-story'>
            <Col className="offset-6 col-6 main">
              <span className="text-center main-bg bg px-5 py-3">
                <h2 className="title">
                  Le trésor du legéndaire <br />
                  pirate la buse
                </h2>
                <Button onClick={() => setStart(true)} variant='' className="btn text px-2 bounce">Commencer le jeu</Button>
              </span>
            </Col>
          </Row>


        }
      </Container>

      <Container className='mt-5'>

        <Row >
          <Col className="text-center">
            <Image className='game-img' src='/src/assets/images/game1.png' />
          </Col>
        </Row>

      </Container>


    </>
  )
}


export default App
