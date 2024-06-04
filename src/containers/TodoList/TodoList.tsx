'use client';

import { useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StyledTodoList from './TodoList.styles';

type StatusType = '미시작' | '진행중' | '완료';

type SortType = 'Ascending' | 'Descending';

interface Todo {
  id: number;
  text: string;
  status: StatusType;
  date: Date;
}

const INITIAL_TODOS: Todo[] = [];
const SORT_TEXT = {
  Ascending: '오름차순',
  Descending: '내림차순',
};

export default function TodoList() {
  const [todoList, setTodoList] = useState<Todo[]>(INITIAL_TODOS);
  const [input, setInput] = useState<string>('');
  const [sort, setSort] = useState<SortType>('Ascending');
  const [filter, setFilter] = useState<string>('');

  const addTodo = () => {
    const today = new Date();
    setTodoList([
      ...todoList,
      { id: uuidv4(), text: input, status: '미시작', date: today },
    ]);
    setInput('');
  };

  const deleteTodo = (id: number) => {
    setTodoList((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const markTodoAsCompleted = (id: number) => {
    setTodoList((prevTodolist) =>
      prevTodolist.map((todo) =>
        todo.id === id ? { ...todo, status: '완료' } : todo,
      ),
    );
  };

  const changeTodoStatus = (id: number, status: StatusType) => {
    setTodoList((prevTodolist) =>
      prevTodolist.map((todo) => (todo.id === id ? { ...todo, status } : todo)),
    );
  };

  const toggleSortOrder = () => {
    setSort((prevSort) =>
      prevSort === 'Ascending' ? 'Descending' : 'Ascending',
    );
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleChangeFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleClickAdd = () => {
    addTodo();
  };

  const handleClickDelete = (id: number) => {
    deleteTodo(id);
  };

  const handleClickComplete = (id: number) => {
    markTodoAsCompleted(id);
  };

  const handleClickSort = () => {
    toggleSortOrder();
  };

  const handleChangeStatus = (id: number, status: StatusType) => {
    changeTodoStatus(id, status);
  };

  return (
    <StyledTodoList>
      <h1>Todo List</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <p>작업 추가 영역 : </p>
          <input
            value={input}
            onChange={handleChangeInput}
            placeholder="입력 필드"
          />
          <button type="button" onClick={handleClickAdd}>
            작업 추가
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <p>검색 영역: </p>
          <input
            value={filter}
            onChange={handleChangeFilter}
            placeholder="검색 항목을 넣어주세요"
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <p>정렬 상태 :</p>
          <button type="button" onClick={handleClickSort}>
            {SORT_TEXT[sort]}
          </button>
        </div>

        <div>----------------------</div>
        {todoList &&
          todoList
            .filter((todo) => todo.text.includes(filter))
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
                      handleChangeStatus(id, e.target.value as StatusType)
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
                      handleClickComplete(id);
                    }}
                  >
                    완료
                  </button>
                  <p>{date.toUTCString()}</p>
                  <button type="button" onClick={() => handleClickDelete(id)}>
                    제거
                  </button>
                </div>
              );
            })}
      </div>
    </StyledTodoList>
  );
}
