import React, { useState, useRef } from 'react';

const TweetInput = ({ onTweetSubmit }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setText(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onTweetSubmit(text.trim());
    setText('');
    textareaRef.current.style.height = 'auto';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 d-flex justify-content-center"
    >
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <textarea
          ref={textareaRef}
          className="form-control"
          placeholder="What's happening?"
          value={text}
          onInput={handleInput}
          rows={1}
          style={{
            resize: 'none',
            overflow: 'hidden',
          }}
        />
        <div className="d-flex justify-content-between mt-2">
          <span className={text.length > 255 ? 'text-danger' : 'text-muted'}>
            {text.length} / 255
          </span>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={text.trim().length === 0 || text.length > 255}
          >
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetInput;
