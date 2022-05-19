const Course = ({ course }) => {
  const Header = ({ course }) => <h2>{course.name}</h2>

  const Part = ({ part }) =>
    <p> 
      {part.name} {part.exercises}
    </p>
    
  const Total = () =>  
    <p>
      <b>Total of {course.parts.reduce((sum, {exercises}) => sum + exercises, 0)} exercises</b>
    </p>  
  
  return (
    <div>

      <Header course={course} />

    
      {course.parts.map(part => 
          <Part key={part.id} part={part} />
          )
      }
    <Total />
    


    </div>
  )
}

export default Course


