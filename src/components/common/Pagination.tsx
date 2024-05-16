import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

const SPaginationContainer = styled.div`
  margin: 60px;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  justify-content: center;
  list-style: none;
  color: #5b5b5b;
  font-weight: 500;
  li {
    margin: 0 5px;
    cursor: pointer;
  }

  .active {
    color: black;
    font-weight: 500;
  }
  .disabled {
    color: #d5d5d5;
    pointer-events: none;
  }
`;

interface Pagination {
  totalLogs: number;
  handlePageChange: (selected: { selected: number }) => void;
}
const Pagination = (props: Pagination) => {
  const { totalLogs, handlePageChange } = props;
  const page = Math.ceil(totalLogs / 8);

  // 페이지네이션 컴포넌트를 렌더링
  return (
    <SPaginationContainer>
      <StyledReactPaginate
        pageCount={page} // 전체 페이지 수
        pageRangeDisplayed={10} // 현재 페이지 주변에 표시될 페이지 수
        marginPagesDisplayed={1} // 처음과 마지막 페이지 주변에 표시될 페이지 수
        onPageChange={(selected) => handlePageChange(selected)} // 페이지 변경 핸들러 지정
        containerClassName={'pagination'} // 페이지네이션 컨테이너에 적용될 클래스명
        activeClassName={'active'} // 활성화된 페이지에 적용될 클래스명
        previousLabel={'<'} // 이전 페이지 라벨
        nextLabel={'>'} // 다음 페이지 라벨
      />
    </SPaginationContainer>
  );
};
export default Pagination;
