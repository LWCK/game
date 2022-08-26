import './App.css'
import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import React, { useEffect } from 'react'

const App = () => {

	const [gameList, setGameList] = React.useState<any>('')
	useEffect(() => {
		fetch("http://192.168.1.250:1337/api/pages?populate=*")
			.then(response => response.json())
			.then(result => setGameList(result))
			.catch(error => console.log('error', error));
	}, []
	)


	const [rule, setRule] = React.useState<any>('')
	useEffect(() => {
		fetch("http://192.168.1.250:1337/api/rule")
			.then(response => response.json())
			.then(result => setRule(result))
			.catch(error => console.log('error', error));
	}, []
	)

	// console.log(gameList);
	console.log(rule && rule.data.attributes.text);

	const [step1, setStep1] = React.useState<boolean>(true)
	const [step2, setStep2] = React.useState<boolean>(false)
	const [step21, setStep21] = React.useState<boolean>(false)
	const [step3, setStep3] = React.useState<boolean>(false)

	const startGame = () => {
		setStep1(false)
		setStep2(true)
	}

	const showIntro = () => {
		setStep21(true)
		setStep2(false)
	}


	const imgGame = () => {
		setStep2(false)
		setStep21(false)
		setStep3(true)
	}

	console.log(gameList.intro);


	return (
		<>

			<Container>
				<Row>
					<Col xs={12} className="gif-orientation text-center">
						<Image src="/src/assets/images/turnscreen.gif" alt="" />
						<h2 className="title">
							Pour commencer, <br />
							veuillez pivoter le téléphone
						</h2>
					</Col>
				</Row>
			</Container>

			{step1 &&

				<Container className='vh-100 main only-portrait'>
					<Row className="bg p-4">
						<Col xs={12} className='text-center '>
							<h2 className="title">
								Le trésor du legéndaire <br />
								pirate la buse
							</h2>
							<Button onClick={() => startGame()} variant='' className="btn text">Commencer</Button>
						</Col>
					</Row>
				</Container>
			}
			{
				step2 &&
				<>
					<Container className='only-portrait main p-5 '>
						<Row>
							<Image className='char-img-2' src="/src/assets/images/char2.png" alt="" />
							<div className='text-center char-text bg title'>


								<h2>Salut moussaillon !!</h2>
								<Button onClick={() => showIntro()} variant='' className='text-end'>
									Rappel des règles
								</Button>
								{/* <Button onClick={() => imgGame()} variant='' className='text-end'>
									jeu
								</Button> */}

							</div>
						</Row>
					</Container>
				</>
			}

			{step21 &&
				<>

					<Container fluid className='vh-100 main only-portrait bg'>
						<Row className="p-3">
							<Col xs={12} className='text text-center'>
								<p className='text-justify text'>
									{rule && rule.data.attributes.text}
								</p>
								<Button onClick={() => imgGame()} variant='' className="btn text">Commencer

									{/* //step */}

								</Button>
							</Col>
						</Row>
					</Container>

				</>
			}

			{
				step3 &&
				<Container className='only-portrait main bg'>
					<Row>
						<Col className='text-center'>
							<h2>Règles du Jeu</h2>
							<p>{gameList.rules}</p>
							<Image className='game-img' src='/src/assets/images/game1.png' />
						</Col>
					</Row>
				</Container>
			}
		</>
	)
}


export default App
