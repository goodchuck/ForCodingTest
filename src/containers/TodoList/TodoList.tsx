'use client';

import { useState } from 'react';
import StyledTodoList from './TodoList.styles';

type StatusType = '미시작' | '진행중' | '완료';

type SortType = 'Ascending' | 'Descending';

interface Todo {
  id: number;
  text: string;
  status: StatusType;
  date: Date;
}

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>('');
  const [sort, setSort] = useState<SortType>('Ascending');
  const [filtered, setFiltered] = useState<string>('');

  const addTodo = () => {
    const today = new Date();
    setTodoList([
      ...todoList,
      { id: todoList.length, text: input, status: '미시작', date: today },
    ]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  // 작업 생성
  const handleClickAddBtn = () => {
    addTodo();
  };

  // 작업 삭제
  const handleClickDeleteBtn = (id: number) => {
    deleteTodo(id);
  };

  const handleClickStatueCompleted = (id: number) => {
    setTodoList((prevTodolist) =>
      prevTodolist.map((list) => {
        return list.id === id ? { ...list, status: '완료' } : list;
      }),
    );
  };

  const handleChangeStatusSelect = (id: number, status: StatusType) => {
    // console.log({ id, status });
    setTodoList((prevTodolist) =>
      prevTodolist.map((list) => {
        return list.id === id ? { ...list, status } : list;
      }),
    );
  };

  const handleClickSort = () => {
    setSort((prevSort) =>
      prevSort === 'Ascending' ? 'Descending' : 'Ascending',
    );
  };

  const handleChangeFilterValue = (value: string) => {
    setFiltered(value);
  };

  return (
    <StyledTodoList>
      <h1>Todo List</h1>
      <div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <p>작업 추가 영역 : </p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="입력 필드"
          />
          <button type="button" onClick={handleClickAddBtn}>
            작업 추가
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <p>검색 영역: </p>
          <input
            value={filtered}
            onChange={(e) => handleChangeFilterValue(e.target.value)}
            placeholder="검색 항목을 넣어주세요"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <p>정렬 상태 :</p>
          <button type="button" onClick={handleClickSort}>
            {sort}
          </button>
        </div>

        <div>----------------------</div>
        {todoList &&
          todoList
            .filter((list) => {
              return !!list.text.includes(filtered);
            })
            .sort((a, b) => {
              if (sort === 'Ascending') {
                return a.text.localeCompare(b.text);
              }
              return b.text.localeCompare(a.text);
            })
            .map((list, index) => {
              const { id, text, status, date } = list;
              return (
                <div
                  key={`${index + Math.random()}`}
                  style={{ display: 'flex', gap: '20px' }}
                  className={list.status === '완료' ? 'cancel' : ''}
                >
                  <p>{text}</p>
                  <select
                    onChange={(e) =>
                      handleChangeStatusSelect(id, e.target.value as StatusType)
                    }
                    value={status}
                  >
                    <option value="미완성">미시작</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      handleClickStatueCompleted(id);
                    }}
                  >
                    완료
                  </button>
                  <p>{date.toUTCString()}</p>
                  <button
                    type="button"
                    onClick={() => handleClickDeleteBtn(id)}
                  >
                    제거
                  </button>
                </div>
              );
            })}
      </div>
    </StyledTodoList>
  );
}
