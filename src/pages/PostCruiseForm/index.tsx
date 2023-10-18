import React from 'react'
import Navbar from "../components/Navbar";
import Button from '../components/button';

const postCruiseForm = () => {
  return (  
    <body>
      <h1>Post-Cruise Form</h1>
      <form method="post">
          <p>Please fill out all the information below in order to submit a request for a post cruise approval.</p>

          Actual Start Datetime: <input type="date" id="actualStartDatetime" name="actualStartDatetime" required></input>

          Actual End Datetime: <input type="date" id="actualEndDatetime" name="actualEndDatetime" required></input>

          Acomplishments: <textarea id="acomplishments" name="acomplishments" placeholder="acomplishments (up to 8000 character text field)" required></textarea>

          Scientist Comments: <textarea id="scientistComments" name="scientistComments" placeholder="scientistComments (up to 8000 character text field)" required></textarea>

          Scientist Objectives Met?: <input type="checkbox" id="sciObjectivesMet" name="sciObjectivesMet"></input>

          Operator Comments: <textarea id="operatorComments" name="operatorComments" placeholder="operatorComments (up to 8000 character text field)" required></textarea>

          All Equipment Functioned?: <input type="checkbox" id="allEquipmentFunctioned" name="allEquipmentFunctioned"></input>

          Other Comments: <textarea id="otherComments" name="otherComments" placeholder="otherComments (up to 8000 character text field)" required></textarea>

          {/* <!-- Need to also submit the ID of the user who submitted the form, will be recorded on database, but not listed on form. Can be retrieved from database based on who is logged in --> */}
          
        <input type="submit" value="Submit" />
        
        {/* <button onclick="window.location.href='../pageSelector.html'" id="back" name="back">Back</button> */}
        <Button hrefLink="/pageSelect" buttonName="Back"/>
          
      </form>
    </body>
  )
}

export default postCruiseForm
