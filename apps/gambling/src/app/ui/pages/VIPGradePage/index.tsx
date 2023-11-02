import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import {
  useGetSignInConfigMutation,
  useGetUserVIPAllInfoQuery,
  useGetVIPInfoMutation, useLazyGetUserVIPAllInfoQuery,
} from '../../../external';
import { AppLocalStorage } from '../../../persistant/localstorage';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useAllowLoginRouterRules } from '../../router/useAllowLoginRouterRules';
import { LevelList } from '../DailySignInPage';
import { VIPGradeMobileTemplate } from './VIPGradeMobileTemplate';
import {useDispatch, useSelector} from "react-redux";
import {appStore, RootState} from "../../../reduxStore";
import {appSlice} from "../../../reduxStore/appSlice";
import {IUserStore} from "../../../gateway/socket";

const VIPContainer = styled.div`
  background-color: rgba(40, 112, 82, 0.1);
  background-size: 100% 100%;
  border-radius: 28px;
  padding: 28px;
`;

const VIPICONContainer = styled.div`
  width: 148px;
  height: 56px;
  background: rgba(200, 5, 255, 0.15);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  margin-right: 1vw;
`;

const LevelButton = styled.button.attrs<{
  className?: string;
}>((props) => ({
  className: cx(props.className, 'flex flex-row justify-center items-center'),
}))`
  width: 84px;
  min-width: 84px;
  height: 40px;
  min-height: 40px;
  text-shadow: 0px 1px 0px #ffffff;
`;

export const CurrentLevelButton = styled(LevelButton)`
  //color: #841c00;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAA2CAYAAAAGRjHZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkU4MjJDMTg5NkQ2MTExRUVBQUREQzNFRUQxMDhDM0E2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkU4MjJDMThBNkQ2MTExRUVBQUREQzNFRUQxMDhDM0E2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RTgyMkMxODc2RDYxMTFFRUFBRERDM0VFRDEwOEMzQTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RTgyMkMxODg2RDYxMTFFRUFBRERDM0VFRDEwOEMzQTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4+FHoVAAACSUlEQVR42uydTUuUURiG7zGzQKqVlGb0ZYZBm8xF0KKfoKit+glB1CKpHxBlmzb9g3ZK2n9o2QckWEEqojmLSMEC0z6m+znzSjJObXM81wX3w5lhVs97zTnvOwznlCqzqkeL01/kktNRvAeNy1dn0XntTDjPnI3aD5XqCDHgjGpJXSp7tOJ8c37R0Yam2dnvHHLa01f8g+uI8/RvQuxx7lmC25rz6BM93NW0OSeTHKOud52ftUI80KxlmPboB/3KZtY455xKUoxsFWLIS8SYXiFDllJcSEvIsOt4CBE3izN6rk6WiYyXj8v6GHNFk8uwFpAha+LaL+io69Xm9Gi55FqhL1kTDhxTfwjRp2WEyJ7lVC+GEEe0hhDZs5Zqewixr/oECllTdaCliU5A7VMoywUgBCAEIAQgBCAEIAQgBCAEIAQgBOw4IfhHNTBDAEIAQgBCAEIAQgBCAELAfxGCH6aAGQIQAhACEAIQAhACEAIQAhACEAIQAnYmsWHIF3axhrSPsbQRM0RZrTqgdXqSNa2plkOIN2pTtz7Tk6w5nOqLEGJSZzSkt/Qka7pTnfyztfETdWqevmTJceda2tr4dNxUxiEat9QrjkjJkbjmvWl001nf3JZwTD16qCvFqwrJIkFc87j24YC2H6DySO90XS89muPLs6s5UcwMPXrsekN1DlDZZNC5ryl16X16KJVWxf8uG51YCw6qerzSWed8OmLpjjO+9WOlfxzCFgdqDBQexdb5e+lqQ/PdiRvHmP8niiVi2yFsvwUYAHO0CFu7ab0WAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-size: 84px 40px;
  border: none;
`;
export const OtherLevelButton = styled(LevelButton)`
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAAA2CAYAAAAGRjHZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzOEYxMkI5NkQ2MTExRUVCOUE1RENFNEMwNDA0Q0RCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzOEYxMkJBNkQ2MTExRUVCOUE1RENFNEMwNDA0Q0RCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RjM4RjEyQjc2RDYxMTFFRUI5QTVEQ0U0QzA0MDRDREIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RjM4RjEyQjg2RDYxMTFFRUI5QTVEQ0U0QzA0MDRDREIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Rbp0kAAACfklEQVR42uydz24SURSHz52pjAhYGyVV6sp00b26cO0LYGJNfAdd6AKjD9CYutCNT+ASqzW+gA+gMXHduGqtrTVNHfoHLHM9B4YEG9wL9/uSH5BhhsU5H3cuLO51N7+/khEUNPU8NzS1/BiMLy3Nuuaz5q3mnaZz8qSpERfe0iy77dZ8tLMv8utIXOdYJPOUdJyJo7JPphaknCxk1dJdXy2v6dFHmjf/EiLWLLmd/Ua0sSdu94AiThLdTNyBDgiaeDsVP3NmPqudXVExlvXdJ3bGSSGWVIRG9PVn72KYbOwLH+von3W6jWxuWvLRQqL8/dvuRwsZAhw1rOfWe3NgIIRNFp9H3/aQIVQprPciL8wFE2LRbaWX3e4hxQn29nEo6sCcvrxjQtR7vyYgaHIH6ibEdZceUZHQR4m+A9dMiIvS6VKR0Ok7cMmESPjTCXIHChGVgL/mEpQAEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIQAhACEAIAIQAhACEAIQAhACEAIQAhACEAIQAhACHgvxcilRgvMMHZY8dM2PRJTEFCp9BzYNOE+CKlhIIEjq+ctqePJsRqdqFERQInd2DVhGj62cq6P1ekKqGODtp7dWDDXDAhbBONh70V0Zlchof2PF8N/4GmPTCg6avlZ9mV8yKOGgWD9tp6br03B+zQ8H4Zj9WUoi/E92x1dBZDn/DbxExRstq0yfDSej84PiyErW17X0/40K2Wn7qttL/FUtoW1z7WT2C12/EeDZz4RNtdSXoTSJ0zrOUivB4+bdSeWyua93rBYne2YvtvXdXY0vmnqOpY81tjE8dP0t+ErSkjNmH7I8AAQaWz+gRPJ8UAAAAASUVORK5CYII=);
  background-size: 84px 40px;
  &:hover {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAAeCAYAAABkDeOuAAAAAXNSR0IArs4c6QAAByxJREFUaEOlmr2rHUUYxp/Z83GNMeLNFT+CjUVIIaQQCxHSKKZLZxMRIUJuYXELIQZsjhYWQlJYmX8hTRq1lFjEImogViIxIpGICAZzMfHe87Ej7+48N899M7NnYw4cZnZ2ds/Ob5/nnXdnT4B8xlfi4VBjHQFHArAGIOh+1qNvZC8po9WH7RnqCgC/A6DZ575NW+ET7Af5o6zXQFgAqNtvZe1WXwBNf6vbR49zAwiF34zAXQBXY8T56Ze4gA9Dc7ad7ivfx40QcQqhGVbnpzcsO9MgwSKcCoiDBI9XkK4iB6zZ5WERFKHEBGve9m2G5uEquFBQQX7Ul7bmOImXw2ZzLePv4vEq4Ey9Bcw3ASvtDvX6GBAiJ2aDQSAJWKMy1q1MqmvaVGX2o3q7eB0EkJTUXB+VZZBYZztBqsJYXzawCggjYPAYMNgHhICLWy+FtwJ+iHtXZrg8/wuri1vLzpLZrxa0ukGykrYzKATnIRKeh60/Q1Xp4AnMICXrNSW3uZ9lzoo9hxr2AONnmpt7IqxciccWt3Bu/kfPo7vilVhtl4oUnNa1v497Pt5QFQrHQ1NgYtFi7Oo55LAXGD+HL8L4m3h6eg0bOwGx5wl2dVNl0FYsS2rSfi52Ncq0wbJUdRFCik+77KdK0vpDKIvjfGQN10N1Pk7qTazfx4g/0DFL7QRRKkQHrbDUlmo9jVc63TBm5QI12+z6LD55ezJ2+UnhQUXgxj+OuBnwWZzA0oWcvfSAXF2P8ZbSoK3gfEAnmNxNsX0emAZ6D0oVaNdGmGrpvtCo6nQTR1OD9WmcIGRg9TkprcK+PtgTGIN+Jr/amUmtj1ez5iiqKG9LbhNOLm3oM56OPi2ss3ECYP2+C+Xd6LKhP7m3ldrSg9KUQ22cu+Dc4HNgNDUgQEJeNo5c2BExtLA+SbAehry/EG/BXADPzX65Aam6fKDO5VClWKXn+R9jbWF9/ICwcgPSti4I3qZ20ZqAeoXpwK2vj18+vSCE3OyXg/UAAFtYH8UJ4pKYxUFSlh4O2/3AfX8Pcpk1lllS4XiwhKvnyKm0Z/AfzQ3WB3GCSmDZgPWkOYv5WVADfJfycjNfqX/prpesqDHW98kpzaswB1Xi2GhmsN6X2bALjO4r5Uel47vO6x/bfV8/I3q1lcCULJmzdsnO0j5aGKz3nLIYjH06kJvZGHNK9srFKH9+H7dKwdc/BHcF/lyQZ39NQTyk3DlTvtXacMPlWcsUxP1qKWvLqW0ZRK+qPrNUaZ0qpzBNHzSGsb0E1f8GgFFtsN4twCrlRdquyiIwD7HPDLgMUrq7u2KpDkhBaZ3PhzqTekC2rZm+zrhqw+ZxZ11s6FVFy/jnPAWmivKZusLsSkL7zIol21m7t1bu+dH3IzRNblVxzqKtst5JeZZXjA3cPixVObpmxeP4gKzwqDKFqDHLpyAlhfmZ0StJ7UYodi6C0Adu7vcP4RrTMnGthfV2smHOPgTBxTvb5sB1pZPLMBq7dHXBW9rHsq6HaR2EznCluKPrXQrGLwiyH/vo/ozCRo0N35SYpQrwCuGyMIHllo29+nIrDL5NZ127yJwlvQW9knRwHLS8zNhZTdVlaA/PL+0oaAvwMFhvxAmGKSnNWcoGR5WoqnSpWJeOra+C7Yp3XZYsxSjC9c+FOeXoMrMuQeuavV9d9dZNN2JsedZTr8bJn/ub11/31s6pEL/KSQhWKqCRANUXE3ae0osJtWwup9MAq/YrLdWo/QhOobBuMHJ1zopcgdV1MwBPbOJmeOVQPP3tQWzM/dsXKoJgqBgCNEBWV3Csq1V1MsjNlt52vGmElQvu3nYarFVNHswsBX0rqagcUG9lAC/cwPVw9Pl47Lf9OPfjAVEWwdF+VBFh5EoDQYCEqBZm3acdXlWcfVVZ+lrOg6Ii1IaEobAMisIiJLblXqclda39A7z4Kz4PR5+Oe+M+XP5lDavXn5TZjgMuKWksqiK8Eixr91m+zqz6KOXTB8JhYurTAA3E+u5QYbA+FWVZX27bfm/NBH/1DnD4d2A8xYnGBK8fjMdr4MztPcCNVeDvR4GpwVC1qJps8LbNPr4kNFWmTyu6ZkWC8XFLVaWzl8Yoxi6vItsmFIOkSiM0O3YGVHPg8X+BZ28DBzabVZiLX12zl6zp89rBuBErnMIAVRwCtb12HwJxBNi2lba9WAHiOO1bAWprT9u17bO+/Nqx9t+GClgka1vdZtfmVT0tp8+IGsNyKYO9uk9w+J+GMAeq9Eq/mrX/gQgGxwY+AwZWToGm3/a9cjAHwnbbx+BVdpz1WwC2L6Ucl+7UOHn55/T6fgfYoXi4tjSiwpF6iLV6iNDASl8Ds7C6wbHSYBlYQiPYcQup6WOlASOspLDm/w7+qaErx3KqMmA5WDbQBkyyWQNgGxhMWyiEFraAocGydgNjZYJV1bhbzXC1nuP81z/hQro9+A+mvIOijcmdXQAAAABJRU5ErkJggg==);
  }
`;

export const IRLevelButton = styled(LevelButton)`
  //color: #841c00;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAAxCAYAAAD6BNZ1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkZGRjA4OTIyNkQ2MjExRUVBMjREODhCNjQ1NDZGNkExIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkZGRjA4OTIzNkQ2MjExRUVBMjREODhCNjQ1NDZGNkExIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkZGMDg5MjA2RDYyMTFFRUEyNEQ4OEI2NDU0NkY2QTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkZGMDg5MjE2RDYyMTFFRUEyNEQ4OEI2NDU0NkY2QTEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7E0e6eAAAFo0lEQVR42uxcS29bRRQ+fjs4KXH6QCG1qNKoDQ3lVRUEC1rxkFghEEsK6goQDwmxgZ9AWVAWgChiwXMNYoWgVIEFCCreTWhRGyqlSYCGOuAYO36F79w74xk7TnAb2/W9Ol/0Jb7X9zrWfHPOnHNn5gRml6+nFiAC3gLuB8fAHeDVYC/YR4JmkQEXwVnwV3ACHAe/AYvr/fDAOsQOgneCB8H7RNS2d4KPwLfAY2ClU2KHwYfA58BrRYeO4xfwEPg+WGqn2HeAr4LX1b8Rojx8eQY9IQeTXwJLFKAyWBF5msQyWm0ZLVlBK1Yohhbsge/uQyvGG11+AnwS/KLVYvN/Oww+xvdUb3a+xjxFKY2vWRC12oQKWrhASZjTJqcz1PQPotfBZ8F8K8TeBn4A3lgr8hy+wgVRosMo0ABUHawX/QfwAfDsesTmNz8GB427zsK5zMCS89Lyl83S4xgsh2ByCfv0HHgv+NOliH0z+BnYb3z5NEaTtLR2l6DkuPaUfWoBvAv8brXIuhFGlEVXhY7RFKx5UcKtLkIQhhdDCLdEw/pUv9LtNvBMM5bNwdiX4E06Bog6QmeldbvWrScwlg/bsfP34O31QVsjyz5shOYLfsPvrFh0VyPr6FQyFs76vQQ+sZZls7//VHeREMbogIzRHsrTkwjaUnZado+Ku1ZYNr9+xfiCLK5OO3cIvAI2zAEwQUpH1nM3qSdtttgHwVEd5xHSK3HdXsQMOKylHVW6vmm7cZ7UOKWicIg87Vi1wJsIwJ0HjTs/De5kWcPWWD2irbosQnvenQed52BhnUbz7ORRLfbDJlH/S9y3D8A6hukqffiIFpsXHtyvzxYlKPNJ7p22xWZ9Iyz2XlILDyrIwcsye+UTFBw9g+70KOu7l8Xeb6w6A7EFfgHrGTNz4ftY7F3Gz+dkvPbVuJ2D2FWMhU1uTc4jdbFsP1n2kn04ymKnzJtFsWwfYbl2QepWFjtpzF7s2l9i1+iZ1KmXg7IkXb6T20I0TO7i84j7VgAUwf2CgJnfdnIxFpufjW5xxQ7BukvSSj5BqHZRYprFntZiB2HgRRHbN4iYEZpxjsXm2a49bk+IwbJz0ko+QdjOsolOstgT1RGceiD2grSSbyy7xz6cZLHH9VGC+pBnz0kr+QQJZxNtFeMs9nFydwn2xSkOV85bTWQyxOuI4iduLJu3AR/XqdeHpOa0+ylJv9Mf0loeR795VkZK36JevPCuFnsjfmZEbM+DdbTwthuwueDlprxWaSSCUwPoFfOyNMmz2AT9ImYtKet6zBab5z9eBN/ggxQNwsnn6F/ZvOc5XIGROmX2YTIOKX1rNgmw8D+TmvLMUBYHZ6T1PIbdtB05VXV350laZd04n3ga/IQ7Ad/A7uBPceeewRboZQnNkxxPkVWKo36v11HwCPg4H+yAQ8gjWF9wIndBd0ffvY5eFo6QtfWn3o1r8KKlr0hVWqigg/xIU/S37OLsWlwJa76Bhin4P7s4V9uMzwvLedvuZu0PWPALYuFdhwFYNAttTWaeV0Kfrr92rcoLe5Rbr27In6BpmpMxvGswiDF6bGXlhbvBbxtdf9E1VRbgzidpBjYuadnlQi9G2l00BCtsXU0VjW1UVy2pSGU6hc8+J9WSOo6tcNw7YXuRldWSHgSn1rr3YuqgvQw+SlYthwKi+rM0T7Ow95xMnrQNPRSFHSfpGtqIVzUJFIdT/CDsGWpRHTQb+8DXyNpYoPEP5D5PGfzNw9EvOSlbGbF8SRYnN40w4umQs2EnAgcdow14tRmZ84baeWmNSXLLaHze7Odfau3SA+Dz5O77FXQWvLLoBfA9anPtUhu8gZ9rdvBsGe8STIgObQM/5OBpyndUhtSxqsSNwCvbblVunovYcr3xIdUBekWrprGohOVaGVxv/IRy019TC+qN/yfAAN9sgLPewUbJAAAAAElFTkSuQmCC);
  background-repeat: no-repeat;
  background-size: 84px 40px;
  border: none;
`;

export const VIPBorderStyleContainer = styled.div`
  padding: 1vw 30px;
  background: rgba(255,255,255,.1);
  border-radius: 10px;
  //border: 1px solid rgba(255,255,255,.8);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const VIPLightBorderStyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const VIPTextBorderStyleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  height: 100%;
  padding: 10px 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 478.5px; !important;
`;

const VIPLabel = styled.div`
  width: 150px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  //box-shadow: inset 0 0 36px 5px rgba(255, 219, 0, 0.09);
  border-radius: 30px;
  border: none; /* 取消边框 */
  color: #fffa05;
  font-family: ERASBD;
  margin-top: 6px;
  float: right;
  font-weight: bold;
  background: url("assets/001/vip_di.png") no-repeat center;
`;

const vips: number[] = [];

for (let i = 0; i <= 25; i += 1) {
  vips.push(i);
}

// const user = AppLocalStorage.getItem("userInfo") ? JSON.parse(AppLocalStorage.getItem("userInfo") || ""): {};

const VIPList = () => {
  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(0);

  return (
    <section
      className={
        'vip-tab-items flex-no-wrap mb-4 flex w-full flex-row overflow-auto'
      }
    >
      {vips.map((numberValue, index) => {
        if (numberValue === currentSelectedLevel) {
          return (
            <CurrentLevelButton className={'mr-4'} key={index}>
              <img
                alt="king"
                className={'mr-2'}
                src={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAATtJREFUOE+t008rRGEUx/HvL0RiZ2chZSE2Ulds5AWwsrC0mEkje1n5Ezt7k8YbUGzIK7AyKWLDRrG2oqZQjo7u1fQ09xpzPau7+J3Pvfec84h/OspyzGwAOAQMWJD0lJZPhcysDTgHpuJif56R9NkIy4I2gM2gaFXSbkMofvMocCfp3UNmNhl/TXtQ9AZEkm7jXCcwAtzIzE6AOeAR2AGOgSowlNKPa2AaWATWgH7gzKFXoKeuqAZ0/zLMMFNz6AKYyLkFVYf2gOWcUNmhAnCQEyo6NAZc5YTGHeoAXoCuFjFfid7vhTQzH3cUQKfxQvr18OPZLWA2yF1KihKoDJSCgE/TB1EPrTSY8L6kUgIVgUqLv7YkqZJAg8A94P36y/kAhiU9/FxaM5sHtoG+JqVnYF3SUdLAJuuyY1+4I2ifqehT2wAAAABJRU5ErkJggg=='
                }
              />
              <span className={'text-lg font-bold'}>LV{numberValue}</span>
            </CurrentLevelButton>
          );
        } else {
          return (
            <OtherLevelButton
              key={index}
              className={'mr-4'}
              onClick={() => {
                setCurrentSelectedLevel(numberValue);
              }}
            >
              <img
                alt="lock"
                className={'mr-2'}
                src={
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAARlJREFUOE/t07ErhVEYx/HvV2wmZZT4GyjJIEySv8AkShlEMYmQQSluKZvNYJYJGVCsNiO7RSbRo1svvfd47/Xe3dnO8z7P57z9OkfqrIgYB5aBPiCAa2BLvSsasagYEUvALpB+/wCm1JN07hcUET3AI9AG3AB7QCuwAAwCr0Cv+pLHiqB54CAb6FKrg0REO/AEdGR/dfwXtAZsAPfqQL45Iq6AYWBR3S8L3apDCXQOjJWFpoEZ4EGdS6AK0A9U0sBrMoqI7izkerciX39Xn78LP1BE7AArZYRcz7q6Wd3noUtgpEnoTJ34hxqmVpjRBTDaZNin6mQa9iFQcwFLoNvqagp1AkfZC2/5A/kEqs9lVn2rgUqc3rDlC5IRchOtsAplAAAAAElFTkSuQmCC'
                }
              />
              <span className={'text-lg font-bold text-white'}>
                LV{numberValue}
              </span>
            </OtherLevelButton>
          );
        }
      })}
    </section>
  );
};

const increment = (target: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${target}%;
  }
`;

const Progress = styled.div<{ progress: number }>`
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  background-image: linear-gradient(270deg, #00bdff 0%, #7f06ff 100%);
  height: inherit;
  animation: ${(props) => increment(props.progress)} 0.5s linear forwards;
`;

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className={'relative mr-10 h-[30px] w-full flex-auto rounded-3xl bg-white bg-opacity-20 leading-[30px]'}>
      <Progress progress={progress > 1 ? 100 : progress * 100} />
      <span className={'absolute right-4 top-0 text-white'}>
        {progress > 1 ? '100' : (progress * 100).toFixed(2)}%
      </span>
    </div>
  );
};

const jackpotMap: {
  [key: number]: {
    image: string;
    label: string;
  };
} = {
  20: {
    image: '20.960d4c12.png',
    label: 'Audi a4',
  },
  21: {
    image: '21.9a505f16.png',
    label: 'BMW 520i',
  },
  22: {
    image: '22.ac866c20.png',
    label: 'Porsche Cayenne',
  },
  23: {
    image: '23.363de727.png',
    label: 'Porsche 911',
  },
  24: {
    image: '24.98d31a44.png',
    label: 'Ferrari 448',
  },
  25: {
    image: '25.2d1da4ad.png',
    label: 'helicóptero',
  },
};

export const VIPGradePage = () => {
  useAllowLoginRouterRules();

  const [triggerGetUserVIPALLInfo, {currentData: vipAllInfo}] = useLazyGetUserVIPAllInfoQuery();

  const [triggerGetSignConfig, { data: signInConfig }] = useGetSignInConfigMutation();
  const [triggerGetUserVIPInfo, { data: userVIPInfo }] = useGetVIPInfoMutation();

  useEffect(() => {
    const token = AppLocalStorage.getItem('token') || '';
    triggerGetSignConfig({
      onlyGetSignInConfig: true,
      token,
    });
    triggerGetUserVIPInfo({
      token,
    });
    triggerGetUserVIPALLInfo(null);
  }, []);

  useEffect(() => {
    const handler = () => {
      const token = AppLocalStorage.getItem('token') || '';
      triggerGetSignConfig({
        onlyGetSignInConfig: true,
        token,
      });
      triggerGetUserVIPInfo({
        token,
      });
      triggerGetUserVIPALLInfo(null);
    }
    window.addEventListener("focus", handler)
    return () => {
      window.removeEventListener("focus", handler)
    }
  }, [])

  // const vip_level = useSelector((state: RootState) => state.app?.userStore?.userinfo?.vip_level)
  const vip_level = useSelector((state: RootState) => state.app?.vip_level)
  console.log("vip_level", vip_level);

  const [currentSelectedLevel, setCurrentSelectedLevel] = useState(vip_level);
  const [currentLevel, setCurrentLevel] = useState(vip_level);
  // console.log("user", user);

  const dispatch = useDispatch();
  // const userStore = useSelector((state: RootState) => state?.app?.userStore);
  const userData = useSelector((state: RootState) => state.app?.userStore)

  useEffect(() => {
    // dispatch(appSlice.actions.setUserStore({
    //   ...userData,
    //   userinfo: {
    //     vip_level,
    //   }
    // });
    //

    // dispatch(appSlice.actions.setUserStore({
    //   ...userData,
    //   userinfo: {
    //     vip_level
    //   }
    // } as any));
    if(!signInConfig) return;
    dispatch(appSlice.actions.setUserVIPLevel(signInConfig?.data?.vipLevel))

    setCurrentLevel(vip_level)

  }, [signInConfig]);

  const { isMobile } = useBreakpoint();

  const allLevelInfo = vipAllInfo ? vipAllInfo.data : [];
  const currentLevelInfo = allLevelInfo?.find(
    (info) => info.level === currentSelectedLevel
  );

  const allSignInConfig = signInConfig?.data.signInAllConfig || [];
  const vipConfig = allSignInConfig?.find(
    (config) =>
      config.identifier.split('::')[2].replace('V', '') ===
      `${currentSelectedLevel}`
  );

  const dayConfigs = JSON.parse(vipConfig?.value || '[]');

  const signBonus = dayConfigs?.reduce(
    (acc: number, current: { cashback: number }) => acc + current.cashback,
    0
  );



  if (isMobile)
    return (
      <VIPGradeMobileTemplate
        userVIPInfo={userVIPInfo}
        allLevelInfo={allLevelInfo}
        allSignInConfig={allSignInConfig}
      />
    );

  return (
    <>
      <div className={'px-14 py-8'}>
        <VIPContainer>
          <section className={'flex flex-col'}>
            <section
              className={
                'md:display introduce-vip mb-4 flex hidden flex-row items-center justify-center'
              }
            >
              <VIPICONContainer
                className={'flex flex-row items-center justify-center'}
              >
                <img
                  alt="vip"
                  className={'h-[38px] w-[54px]'}
                  src={'assets/vip.1bf683b6.png'}
                />
                <img
                  alt="0"
                  className={'h-[38px] w-[24px]'}
                  src={
                    'data:image/png;base64,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'
                  }
                />
              </VIPICONContainer>
              <section>
                <img
                  alt="introduce to vip"
                  className={'h-[50px] w-[500px]'}
                  src={'assets/title1.d89d4f0c.png'}
                />
              </section>
            </section>

            <section className={'mb-4 text-center text-base font-bold text-white md:text-2xl'}>
              <div className="flex items-center justify-center"> {/* 使用 justify-center 来水平居中 */}
                <VIPLabel>VIP {currentLevel}</VIPLabel>
                <span style={{ marginLeft: '10px' }}>INTRODUCAO AO NIVEL VIP</span>
              </div>
            </section>



            <section>
              <LevelList
                currentLevel={currentLevel}
                currentSelectedLevel={currentSelectedLevel}
                setCurrentSelectedLevel={setCurrentSelectedLevel}
              />

              <section
                className={
                  'mb-4 text-center text-base font-bold text-white md:text-2xl'
                }
              >
                — Distância próximo nível —
              </section>

              <VIPBorderStyleContainer className={'flex flex-row'}>
                <div className={'flex shrink-0 flex-col text-left min-w-[250px]'}>
                  <span className={'text-lg text-white'}>
                    Quantidade total de recarga:
                  </span>
                  <span className={'text-left'}>
                    <span className={'text-base text-[#cdb7f6]'}>
                      R$
                      {userVIPInfo?.data?.vip_score
                        ? userVIPInfo?.data?.vip_score / 100
                        : 0}
                    </span>
                    <span className={'text-base text-white'}>
                      /R$
                      {userVIPInfo?.data?.next_level_score
                        ? userVIPInfo?.data?.next_level_score / 100
                        : 0}
                    </span>
                  </span>
                </div>

                <ProgressBar
                  progress={
                    userVIPInfo?.data?.vip_score ||
                    0 / (userVIPInfo?.data?.next_level_score || 1)
                  }
                />

                <div className={'shrink-0'}>
                  <IRLevelButton>
                    <span className={'text-lg font-bold'}>IR</span>
                  </IRLevelButton>
                </div>
              </VIPBorderStyleContainer>

              <VIPBorderStyleContainer className={'flex flex-row'}>
                <div className={'flex shrink-0 flex-col  text-left min-w-[250px]'}>
                  <span className={'text-lg text-white'}>
                    Número total de apostas:
                  </span>
                  <span className={'text-left'}>
                    <span className={'text-base text-[#cdb7f6]'}>
                      R$
                      {userVIPInfo?.data?.flow
                        ? userVIPInfo?.data?.flow / 100
                        : 0}
                    </span>
                    <span className={'text-base text-white'}>
                      /R$
                      {userVIPInfo?.data?.next_level_flow
                        ? userVIPInfo?.data?.next_level_flow / 100
                        : 0}
                    </span>
                  </span>
                </div>

                <ProgressBar
                  progress={
                    userVIPInfo?.data?.flow_progress
                      ? userVIPInfo?.data?.flow_progress / 100
                      : 0
                  }
                />

                <div className={'shrink-0'}>
                  <IRLevelButton>
                    <span className={'text-lg font-bold'}>IR</span>
                  </IRLevelButton>
                </div>
              </VIPBorderStyleContainer>
            </section>

            <section>
              <section
                className={'mb-4 text-center text-2xl font-bold text-white'}
              >
                — Privilégio —
              </section>

              {currentSelectedLevel >= 20 && (
                <div className="flex flex-col items-center justify-center">
                  <img
                    alt="jackpot"
                    src={`assets/${jackpotMap[currentSelectedLevel].image}`}
                  />
                  <div className="py-10">
                    <div className="text-[50px] text-yellow-500">
                      Nível Mega Jackpot:{' '}
                      {jackpotMap[currentSelectedLevel].label}
                    </div>
                    <div className="text-xl text-white">
                      Ou numerário de valor equivalente
                    </div>
                  </div>
                </div>
              )}

              <section className={'mb-4 flex flex-row'}>
                <VIPLightBorderStyleContainer
                  className={'mr-4 h-[100px] flex-1'}
                >
                  <img
                    className={'relative top-[-6px] h-[80px] w-[120px]'}
                    alt={''}
                    src={'assets/001/icon_bullion.png'}
                  />
                  <div className={'flex flex-col text-xl text-white'}>
                    <span>Recompensa total de</span>
                    <span>check-in de 7 dias: R${signBonus}</span>
                  </div>
                </VIPLightBorderStyleContainer>

                <VIPLightBorderStyleContainer className={'flex-1'}>
                  <img
                    className={'relative top-[-6px] h-[80px] w-[120px]'}
                    alt={''}
                    src={'assets/001/icon_bank.png'}
                  />
                  <div className={'flex flex-col text-xl text-white'}>
                    <span>recompensa de</span>
                    <span>
                      atualização : R$
                      {currentLevelInfo?.upRewardAmout
                        ? `${currentLevelInfo?.upRewardAmout / 100}`
                        : '0'}
                    </span>
                  </div>
                </VIPLightBorderStyleContainer>
              </section>

              <section className={'mb-4 flex w-full flex-col text-white'}>
              <section className={'flex flex-row'}>
                <VIPTextBorderStyleContainer
                  className={
                    'mr-4 flex flex-1 items-center justify-center text-lg'
                  }>
                  Limite máximo de retirada única : R$
                  {currentLevelInfo?.withdrawAmountLimitDay
                    ? `${currentLevelInfo?.withdrawAmountLimitDay / 100}`
                    : '0'}
                </VIPTextBorderStyleContainer>

                <VIPTextBorderStyleContainer
                  className={
                    'flex flex-1 items-center justify-center text-lg'
                  }>
                  Número de retiradas por dia：
                  {currentLevelInfo?.withdrawTimesLimitDay}
                </VIPTextBorderStyleContainer>
              </section>


                <section
                  className={'mb-4 text-center text-2xl font-bold text-white'}
                >
                  — Privilégio —
                </section>

                <section className={'flex flex-row'}>
                  <VIPTextBorderStyleContainer
                    className={
                      'mr-4 flex flex-1 items-center justify-center text-lg'
                    }
                  >
                    Quantidade total de recarga : R$
                    {currentLevelInfo?.rechargeAmountLimit
                      ? `${currentLevelInfo?.rechargeAmountLimit / 100}`
                      : '0'}
                  </VIPTextBorderStyleContainer>

                  <VIPTextBorderStyleContainer
                    className={
                      'flex flex-1 items-center justify-center text-lg'
                    }
                  >
                    Número total de apostas : R$
                    {currentLevelInfo?.flowLimit
                      ? `${currentLevelInfo?.flowLimit / 100}`
                      : '0'}
                  </VIPTextBorderStyleContainer>
                </section>
              </section>
            </section>
          </section>
        </VIPContainer>
      </div>
    </>
  );
};
