import { FiPlus, FiTrash2 } from "react-icons/fi";

const Education = ({ data, updateData }) => {

  const addEducation = () => {

    const newEducation = {
      degree: "",
      institution: "",
      startYear: "",
      endYear: "",
      description: ""
    };

    updateData([...data, newEducation]);
  };

  const removeEducation = (index) => {

    const updated = data.filter((_, i) => i !== index);

    updateData(updated);
  };

  const handleChange = (index, field, value) => {

    const updated = [...data];

    updated[index][field] = value;

    updateData(updated);
  };

  return (

    <div className="form-section">

      <div className="form-heading">

        <h2>Education</h2>

        <p>
          Add your educational qualifications.
        </p>

      </div>

      {data.map((education, index) => (

        <div className="item-card" key={index}>

          <button
            className="remove-item"
            onClick={() => removeEducation(index)}
          >
            <FiTrash2 />
          </button>

          <div className="form-grid">

            <div className="form-group">

              <label>Degree / Course</label>

              <input
                type="text"
                placeholder="B.Sc Computer Science"
                value={education.degree}
                onChange={(e) =>
                  handleChange(
                    index,
                    "degree",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>College / University</label>

              <input
                type="text"
                placeholder="Your College Name"
                value={education.institution}
                onChange={(e) =>
                  handleChange(
                    index,
                    "institution",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Start Year</label>

              <input
                type="text"
                placeholder="2023"
                value={education.startYear}
                onChange={(e) =>
                  handleChange(
                    index,
                    "startYear",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>End Year</label>

              <input
                type="text"
                placeholder="2026"
                value={education.endYear}
                onChange={(e) =>
                  handleChange(
                    index,
                    "endYear",
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group full-width">

              <label>Description</label>

              <textarea
                placeholder="Add details about your education..."
                value={education.description}
                onChange={(e) =>
                  handleChange(
                    index,
                    "description",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

      ))}

      <button
        className="add-button"
        onClick={addEducation}
      >

        <FiPlus />

        Add Education

      </button>

    </div>

  );
};

export default Education;