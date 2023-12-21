import React, {useState} from 'react'
import Mw from './Mw'
import SearchExerciseInput from '../UI/SearchExerciseInput'
import { activebite } from '../../api/api'

function AddTrainingModal({active, setActive}) {
  const [modalExercises, setModalExercises] = useState([])
  const [exerciseId, setExerciseId] = useState(null)
  const [duration, setDuration] = useState('')
  const [exerciseName, setExerciseName] = useState('')
  const [trainingTitle, setTrainingTitle] = useState('')
  const [trainingDesc, setTrainingDesc] = useState('')
  const [trainingImg, setTrainingImg] = useState('')

  const addExercise = () => {
    if (!exerciseId || !duration) return
    setModalExercises(exercises => [...exercises, {exercise_id: exerciseId, name: exerciseName, duration: duration}])
  }

  const postTraining = () => {
    if (!trainingTitle || !trainingDesc || modalExercises.length === 0) return
    activebite.post('/trainings/', {
      title: trainingTitle,
      description: trainingDesc,
      exercises: modalExercises,
      image: trainingImg
    })
  }

  return (
    <Mw active={active} setActive={setActive}>
      <h2 className='window_title'>Публикация тренировки</h2>
      <div className='filling_training_fields'>
        <input type="text" className='title_training_field' placeholder='Заголовок тренировки' 
        onChange={(e) => {setTrainingTitle(e.target.value)}} value={trainingTitle}/>
        <textarea className='description_training_field' placeholder='Описание тренировки' 
        onChange={(e) => {setTrainingDesc(e.target.value)}} value={trainingDesc}></textarea>
      </div>
      <input type="file" className='add_picture'/>
      <div className='exercise_info_fields_wrapper'>
        <div className='exercise_info_fields'>
          <SearchExerciseInput setExerciseId={setExerciseId} exerciseId={exerciseId} setExerciseName={setExerciseName}/>
          <input type="number" placeholder='Длительность' className='exercise_info' min="1" onChange={(e) => setDuration(Number(e.target.value))} value={duration}/>
        </div>
        <button className='button_adding_exercise' onClick={() => addExercise()}>Добавить</button>
      </div>
      <div className='list_exercise_wrapper'>
        <ul className='list_exercise'>
          {modalExercises.map((exercise, idx) => (
            <li className='exercise' key={idx}>
              <p>{exercise.name}</p>
              <p>{exercise.duration} мин.</p>
            </li>
          ))}
        </ul>
      </div>
      <button className='publish' onClick={() => {postTraining()}}>Опубликовать</button>
    </Mw>
  )
}

export default AddTrainingModal