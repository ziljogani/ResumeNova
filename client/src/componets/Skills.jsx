import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

const Skills = ({ data, updateData }) => {

  const [skill, setSkill] = useState("");

  const addSkill = () => {

    const newSkill = skill.trim();

    if (!newSkill) return;

    if (data.includes(newSkill)) return;

    updateData([...data, newSkill]);

    setSkill("");

  };

  const removeSkill = (index) => {

    updateData(
      data.filter((_, i) => i !== index)
    );

  };

  return (

    <div className="form-section">

      <div className="form-heading">

        <h2>Skills</h2>

        <p>
          Add technical and professional skills.
        </p>

      </div>


      <div className="skill-input">

        <input
          placeholder="Example: React.js"
          value={skill}
          onChange={(e) =>
            setSkill(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              e.preventDefault();
              addSkill();
            }

          }}
        />

        <button onClick={addSkill}>

          <FiPlus />

          Add

        </button>

      </div>


      <div className="skills-container">

        {data.map((item, index) => (

          <div className="skill-tag" key={index}>

            {item}

            <button
              onClick={() =>
                removeSkill(index)
              }
            >

              <FiX />

            </button>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Skills;