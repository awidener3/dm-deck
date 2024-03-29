import './monsterBuilder.scss'
import PageHeader from 'components/PageHeader/PageHeader'
import UnderConstruction from 'components/UnderConstruction'
import stats from './monsterStats.json'
import { useState } from 'react'
import { Form, FloatingLabel, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { RiHeartFill, RiShieldFill } from 'react-icons/ri'
import { FaArrowCircleRight } from 'react-icons/fa'

const MonsterBuilder = () => {
  const [values, setValues] = useState({ name: '' })

  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  return (
    <section>
      <PageHeader image={`url(${require('assets/images/card_backs/back_3.jpg')})`} pageTitle={'Monster Builder'} />
      <UnderConstruction />

      <Form onSubmit={e => e.preventDefault()} className="container d-flex flex-column">
        <FormGroup>
          <FormLabel>Monster Name</FormLabel>
          <FormControl
            type="text"
            className="form-control form-name-input monster-name-input"
            name="monster_name"
            value={values.monster_name}
            onChange={handleChange}
            placeholder="Beholder"
            required
          ></FormControl>
        </FormGroup>

        <Row className="my-2">
          <Col>
            <FloatingLabel label="Size" className="builder-input">
              <Form.Select>
                {stats.size.map(s => (
                  <option value={s.toLowerCase()}>{s}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Type">
              <Form.Select>
                {stats.type.map(s => (
                  <option value={s.toLowerCase()}>{s}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="(Subtype)">
              <Form.Select>
                <option value="" selected>
                  none
                </option>
                {stats.subtype.map(s => (
                  <option value={s.toLowerCase()}>{s}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Alignment">
              <Form.Select>
                {stats.alignment.map(s => (
                  <option value={s.toLowerCase()}>{s}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>

        <hr />

        <Row className="my-2">
          {/* HIT POINTS */}
          <Col className="d-flex flex-column gap-1">
            <section className="d-flex justify-content-center align-items-center">
              <RiHeartFill className="me-2" />
              <h4 className="m-0">Hit Points</h4>
            </section>

            <FloatingLabel label="Hit Points">
              <Form.Control type="number" min={0} max={200} className="form-input" placeholder="Hit Points" />
            </FloatingLabel>

            <FloatingLabel label='Hit Dice ("1d4+2")'>
              <Form.Control type="text" className="form-input" placeholder='Hit Dice (i.e. "1d4+2")' />
            </FloatingLabel>
          </Col>

          {/* ARMOR CLASS */}
          <Col className="d-flex flex-column gap-1">
            <section className="d-flex justify-content-center align-items-center">
              <RiShieldFill className="me-2" />
              <h4 className="m-0">Armor Class</h4>
            </section>

            <FloatingLabel label="Armor Class">
              <Form.Control type="number" min={0} max={40} className="form-input" placeholder="Armor Class" />
            </FloatingLabel>

            <FloatingLabel label="Armor Type">
              <Form.Select>
                {stats.armorTypes.map(s => (
                  <option value={s.toLowerCase()}>{s}</option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>

          {/* SPEED */}
          <Col className="d-flex flex-column gap-1">
            <section className="d-flex justify-content-center align-items-center">
              <FaArrowCircleRight className="me-2" />
              <h4 className="m-0">Speed</h4>
            </section>

            <Form.Control type="text" className="form-input" placeholder="Speed" />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col className="text-center">
            <Form.Label className="m-0">STR</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>

          <Col className="text-center">
            <Form.Label className="m-0">DEX</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>

          <Col className="text-center">
            <Form.Label className="m-0">CON</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>

          <Col className="text-center">
            <Form.Label className="m-0">INT</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>

          <Col className="text-center">
            <Form.Label className="m-0">WIS</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>

          <Col className="text-center">
            <Form.Label className="m-0">CHA</Form.Label>
            <Form.Control type="number" min={0} max={25} className="form-input" placeholder="0" />
          </Col>
        </Row>

        <hr />
      </Form>
    </section>
  )
}

export default MonsterBuilder
