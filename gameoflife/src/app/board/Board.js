"use client";
import Cell from "@/app/cell/Cell";
import { useEffect, useState } from "react";

export default function Board({ play }) {
  const createInitialCells = () => {
    return Array(50)
      .fill(0)
      .map((row) => new Array(30).fill(false));
  };

  const [cells, setCells] = useState(createInitialCells);

  const clickLiving = (rowIndex, colIndex) => {
    console.log(`Row[${colIndex}] Col[${rowIndex}]`);
    setCells((prevCells) => {
      const newCells = prevCells.map((row) => [...row]);
      newCells[rowIndex][colIndex] = !newCells[rowIndex][colIndex];
      return newCells;
    });
  };

  const computeNextGeneration = (currentCells) => {
    const newCells = currentCells.map((row) => [...row]);
    newCells.map((row, rowIndex) => {
      row.map((col, colIndex) => {
        let nCount = neighborCount(rowIndex, colIndex, 29, 49, currentCells);
        if ((nCount < 2 || nCount > 3) && currentCells[rowIndex][colIndex]) {
          newCells[rowIndex][colIndex] = false;
        } else if (nCount === 3 && !currentCells[rowIndex][colIndex]) {
          newCells[rowIndex][colIndex] = true;
        } else if (
          (nCount === 2 || nCount === 3) &&
          currentCells[rowIndex][colIndex]
        ) {
          newCells[rowIndex][colIndex] = true;
        }
      });
    });
    return newCells;
  };

  useEffect(() => {
    let timer;
    if (play) {
      timer = setInterval(() => {
        setCells((prevCells) => computeNextGeneration(prevCells));
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [play]);

  return (
    <div className={`bg-gray-400 h-fit w-fit m-20 flex flex-row`}>
      {cells.map((row, rowIndex) => {
        return (
          <div key={rowIndex}>
            {row.map((isCellLiving, colIndex) => {
              return (
                <Cell
                  key={colIndex}
                  living={isCellLiving}
                  onClick={() => clickLiving(rowIndex, colIndex)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function neighborCount(row, col, colLimit, rowLimit, cells) {
  let neighbors = 0;
  if (row > 0 && row < rowLimit && col > 0 && col < colLimit) {
    neighbors = cells[row + 1][col] ? neighbors + 1 : neighbors;
    neighbors = cells[row - 1][col] ? neighbors + 1 : neighbors;
    neighbors = cells[row][col + 1] ? neighbors + 1 : neighbors;
    neighbors = cells[row][col - 1] ? neighbors + 1 : neighbors;
    neighbors = cells[row + 1][col + 1] ? neighbors + 1 : neighbors;
    neighbors = cells[row + 1][col - 1] ? neighbors + 1 : neighbors;
    neighbors = cells[row - 1][col + 1] ? neighbors + 1 : neighbors;
    neighbors = cells[row - 1][col - 1] ? neighbors + 1 : neighbors;
  }
  if (neighbors > 0) {
    console.log(`Row[${col}] Col[${row}]: ${neighbors}`);
  }

  return neighbors;
}
