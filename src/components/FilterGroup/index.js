import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const renderProfile = () => {
    const {profileData} = props
    return (
      <div className="profile-container" key={profileData.name}>
        <img
          className="profile-image"
          src={profileData.profileUrl}
          alt="profile"
        />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  const renderTypesOfEmployment = () => {
    const {typeList, getTypeOfEmployment} = props
    return employmentTypesList.map(eachType => {
      const {employmentTypeId, label} = eachType
      const onClickType = () => {
        const result = typeList.includes(eachType.employmentTypeId)
        if (result === true) {
          const indexArr = typeList.indexOf(eachType.employmentTypeId)
          typeList.splice(indexArr, 1)
        } else {
          typeList.push(eachType.employmentTypeId)
        }
        const joinList = typeList.join(',')
        getTypeOfEmployment(joinList)
      }
      return (
        <li className="checkbox-label-container" key={employmentTypeId}>
          <input
            value={label}
            type="checkbox"
            id={employmentTypeId}
            onClick={onClickType}
          />
          <label className="label" htmlFor={employmentTypeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRanges = () => {
    const {selectedSalaryRange} = props
    return salaryRangesList.map(eachRange => {
      const {salaryRangeId, label} = eachRange

      const onClickSalaryRange = () => {
        selectedSalaryRange(salaryRangeId)
      }

      return (
        <li className="radio-label-container" key={salaryRangeId}>
          <input
            type="radio"
            id={salaryRangeId}
            value={label}
            name="range"
            onClick={onClickSalaryRange}
          />
          <label className="label" htmlFor={salaryRangeId}>
            {label}
          </label>
        </li>
      )
    })
  }

  return (
    <>
      {renderProfile()}
      <hr className="line" />
      <h1 className="types-of-engagement">Type of Employment</h1>
      <ul>{renderTypesOfEmployment()}</ul>

      <hr className="line" />
      <h1 className="salary-range">Salary Range</h1>
      <ul>{renderSalaryRanges()}</ul>
    </>
  )
}

export default FilterGroup
