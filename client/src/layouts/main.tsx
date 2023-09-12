import styled from "styled-components";

const MainLayout = ({ children }: any) => {
    return (
        <StyledLayout>
            <header style={{ height: '65px', borderBottom: '1px solid #bfbfbf' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button>Log in</button>
                </div>
            </header>
            {children}
        </StyledLayout>
    );
};

export default MainLayout;

const StyledLayout = styled.div`
    
`;