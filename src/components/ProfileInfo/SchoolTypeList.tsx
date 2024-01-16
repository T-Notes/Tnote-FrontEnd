interface SchoolTypeListProps {
  onSelectedSchoolType: (selectedType: {
    typeCode: string;
    typeValue: string;
  }) => void;
}

const SchoolTypeList = ({ onSelectedSchoolType }: SchoolTypeListProps) => {
  const typeList = [
    { id: 1, typeCode: 'elem_list', typeValue: '초등학교' },
    { id: 2, typeCode: 'midd_list', typeValue: '중학교' },
    { id: 3, typeCode: 'high_list', typeValue: '고등학교' },
  ];
  return (
    <>
      <div>
        {typeList.map((type) => (
          <ul key={type.id}>
            <li
              onClick={() =>
                onSelectedSchoolType({
                  typeCode: type.typeCode,
                  typeValue: type.typeValue,
                })
              }
            >
              {type.typeValue}
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default SchoolTypeList;
