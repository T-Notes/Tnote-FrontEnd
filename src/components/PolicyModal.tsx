import styled from 'styled-components';

import React, { useState, useEffect, useRef } from 'react';

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SModalBackground = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const SLoginModal = styled.div`
  width: 90%;
  height: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  border: 1px solid #aaaaaa;
  background-color: #ffffff;
`;

const PolicyModal = ({ isOpen, onClose }: PolicyModalProps) => {
  //모달 창 외부 클릭 시 onClose() 실행
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      //모달 엘리먼트가 클릭된 대상을 포함하지 않을 때 true가 되고 onClose() 실행.
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      // 컴포넌트가 언마운트되면 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  const PolicyContent = (
    <div>
      [Tnote]은(는) 사용자의 개인정보를 중요하게 다루고 있습니다. 이에 대한
      안전한 보호를 위해 [Tnote]의 구글 계정으로 로그인하는 경우 다음과 같은
      개인정보처리방침이 적용됩니다.
      <p>1. 수집하는 개인정보 항목</p>
      로그인 시 구글 계정에서 제공하는 기본 정보 (이름, 이메일 주소, 프로필 사진
      등)
      <p>2. 개인정보의 수집 및 이용목적</p>
      회원제 서비스 이용에 따른 본인 식별, 서비스 제공, 고객 서비스 제공 및
      개선, 마케팅 및 광고에 활용
      <p>3. 개인정보의 보유 및 이용기간</p>
      회원 탈퇴 시 또는 서비스 종료 시까지 또는 이용자의 요청에 따른 개인정보
      파기 요청 시까지
      <p>4. 개인정보의 파기절차 및 방법 </p>
      회원 탈퇴 시 또는 개인정보 보유기간 종료 후에는 지체 없이 파기됩니다. 파기
      절차는 다음과 같습니다. 전자적 파일 형태의 정보는 기술적 방법을 통해
      삭제하며, 출력물 등은 분쇄기로 분쇄하여 파기합니다.
      <p>5. 개인정보의 제3자 제공 및 위탁</p>[Tnote]은(는) 이용자의 동의 없이
      개인정보를 제3자에게 제공하지 않으며, 서비스 제공을 위해 필요한 경우에는
      사전에 고지하고 동의를 받습니다.
      <p>6.개인정보보호책임자</p>[Tnote]은(는) 이용자의 개인정보를 보호하고
      개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 개인정보보호책임자를
      지정하고 있습니다. 이름: [개인정보책임자명] 이메일: [이메일주소] 전화번호:
      [전화번호]
      <p>7. 이용자의 권리와 행사 방법</p> 이용자 및 법정 대리인은 언제든지
      자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보의 처리에 동의하지
      않을 수 있습니다. 개인정보 조회 및 수정, 동의 철회는 [웹사이트내
      마이페이지]에서 가능합니다.
      <p>8. 개인정보의 안전성 확보 조치</p> [Tnote]은(는) 개인정보보호를 위해
      다음과 같은 조치를 취하고 있습니다. 개인정보에 대한 접근 제한, 접근 기록의
      보관 및 모니터링 해킹, 바이러스 등에 대비한 보안 프로그램 설치 및 주기적인
      갱신 개인정보 취급자 교육 실시
      <br />
      <p>
        [Tnote]의 개인정보처리방침은 법령, 정부의 지침 및 필요에 따라 변경될 수
        있습니다. 변경 사항은 웹사이트를 통해 공지됩니다. 본 개인정보처리방침은
        2023년 12월 10일에 마지막으로 업데이트되었습니다.
      </p>
    </div>
  );

  if (!isOpen) return null;

  return (
    <div>
      <div>
        {isOpen ? (
          <SModalBackground>
            <SLoginModal ref={modalRef}>
              <div onClick={onClose}>&times;</div>
              {PolicyContent}
            </SLoginModal>
          </SModalBackground>
        ) : null}
      </div>
    </div>
  );
};

export default PolicyModal;
