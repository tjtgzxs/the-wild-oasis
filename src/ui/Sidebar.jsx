import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import useCabins from "../features/cabins/useCabins.js";
const StyledSider = styled.aside`
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row:  1/-1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`
const Sidebar=()=>{
    const {isLoading,cabins,error}=useCabins()
    return <StyledSider>
        <Logo/>
        <MainNav/>
    </StyledSider>
}
export default  Sidebar;