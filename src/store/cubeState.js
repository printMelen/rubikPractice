import { create } from 'zustand'

const newCubeState =[
    Array(9).fill("W"),
    Array(9).fill("O"),
    Array(9).fill("G"),
    Array(9).fill("R"),
    Array(9).fill("B"),
    Array(9).fill("Y"),
];
export const useStore = create((set) => ({
    cubeState: newCubeState,
    f: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa frontal en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[0][3 + i];
            newState[0][3 + i] = newState[1][3 + i];
            newState[1][3 + i] = newState[5][5 - i];
            newState[5][5 - i] = newState[3][3 + i];
            newState[3][3 + i] = temp;
          }
    
          return { cubeState: newState };
        });
      },
      r: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa derecha en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[i][2];
            newState[i][2] = newState[5 - i][2];
            newState[5 - i][2] = newState[5 - i][6];
            newState[5 - i][6] = newState[i][6];
            newState[i][6] = temp;
          }
    
          return { cubeState: newState };
        });
      },
      l: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa izquierda en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[i][0];
            newState[i][0] = newState[5 - i][0];
            newState[5 - i][0] = newState[5 - i][8];
            newState[5 - i][8] = newState[i][8];
            newState[i][8] = temp;
          }
    
          return { cubeState: newState };
        });
      },
      b: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa trasera en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[2][3 + i];
            newState[2][3 + i] = newState[5][3 + i];
            newState[5][3 + i] = newState[4][3 + i];
            newState[4][3 + i] = newState[3][5 - i];
            newState[3][5 - i] = temp;
          }
    
          return { cubeState: newState };
        });
      },
      u: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa superior en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[0][3 + i];
            newState[0][3 + i] = newState[1][3 + i];
            newState[1][3 + i] = newState[5][3 + i];
            newState[5][3 + i] = newState[3][3 + i];
            newState[3][3 + i] = temp;
          }
    
          return { cubeState: newState };
        });
      },
      d: () => {
        set(state => {
          const newState = state.cubeState.map(row => [...row]);
    
          // Girar la capa inferior en el sentido de las agujas del reloj
          for (let i = 0; i < 3; i++) {
            const temp = newState[4][3 + i];
            newState[4][3 + i] = newState[5][3 + i];
            newState[5][3 + i] = newState[1][3 + i];
            newState[1][3 + i] = newState[3][3 + i];
            newState[3][3 + i] = temp;
          }
    
          return { cubeState: newState };
        });
      },
}))