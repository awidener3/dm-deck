import Splash from '../components/splash';
import monsterStats from '../data/monster_stats.json'
import { useState } from 'react';

export default function MonsterBuilder() {
  const [values, setValues] = useState({ 
    slug: '', // name lowercased connected with dashes
    desc: '',
    name: '',
    size: '',
    type: '',
    subtype: '',
    alignment: '',
    armor_class: undefined,
    armor_desc: '',
    hit_points: undefined,
    hit_dice: '',
    speed: {},
    strength: undefined,
    dexterity: undefined,
    constitution: undefined,
    intelligence: undefined,
    wisdom: undefined,
    charisma: undefined,
    strength_save: undefined,
    dexterity_save: undefined,
    constitution_save: undefined,
    intelligence_save: undefined,
    wisdom_save: undefined,
    charisma_save: undefined,
    perception: undefined,
    skills: {},
    damage_vulnerabilities: '',
    damage_resistances: '',
    damage_immunities: '',
    condition_immunities: '',
    senses: '',
    languages: '',
    challenge_rating: '',
    cr: 0,
    actions: undefined,
    bonus_actions: undefined,
    reactions: undefined,
    legendary_desc: '',
    legendary_actions: undefined,
    special_abilities: undefined,
    spell_list: undefined,
    page_no: 15,
    environments: [],
    img_main: undefined,
    document__slug: '',
    document__title: '',
    document__license_url: '',
    document__url: ''
  })

  console.log(monsterStats)

  // this updates the state as inputs are being changed
  const handleChange = e => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    // update slug with formatted name
    values.slug = values.name.replace(/ /g,"-").toLowerCase()

    console.log('submit', values)
  }

	return (
		<>
			<Splash heading={'Monster Builder'} background={'bg-back-17'} />

      <form onSubmit={handleSubmit}>
        <dl>
          <dt><label htmlFor="name">Name</label></dt>
          <dd><input type="text" id='name' name='name' value={values.name} onChange={handleChange}/></dd>

          <dt><p>Size</p></dt>
          <dd>
            <menu id="size" className='form-radio-container'>
              {monsterStats.size.map(size => (
                <li key={size.toLowerCase()} className='form-radio'>
                  <input type="radio" name="size" value={size} id={size.toLowerCase()} onChange={handleChange}/>
                  <label htmlFor={size.toLowerCase()}>{size}</label>
                </li>
              ))}
            </menu>
          </dd>

          <dt><p>Type</p></dt>
          <dd>
            <menu id="type" className='form-radio-container'>
              {monsterStats.type.sort().map(type => (
                <li key={type.toLowerCase()} className='form-radio'>
                  <input type="radio" name="type" value={type} id={type.toLowerCase()} onChange={handleChange}/>
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </li>
              ))}
            </menu>
          </dd>

          <dt><p>Subtype</p></dt>
          <dd>
            <menu id="type" className='form-radio-container'>
              {monsterStats.subtype.sort().map(type => (
                <li key={type.toLowerCase()} className='form-radio'>
                  <input type="radio" name="subtype" value={type} id={type.toLowerCase()} onChange={handleChange}/>
                  <label htmlFor={type.toLowerCase()}>{type}</label>
                </li>
              ))}
            </menu>
          </dd>

          <dt><label htmlFor="alignment">Alignment</label></dt>
          <dd>
            <select id='alignment' name="alignment" onChange={handleChange}>
              {monsterStats.alignment.map(alignment => (
                <option key={alignment} value={alignment} id={alignment.toLowerCase()}>{alignment}</option>
              ))}
            </select>
          </dd>

          <dt><label htmlFor="strength">Strength</label></dt>
          <dd><input type="number" name="strength" id="strength" min="0" max="32" value={values.strength} onChange={handleChange} /></dd>
        </dl>

        <button type='submit'>Create Monster</button>
      </form>
		</>
	);
}
