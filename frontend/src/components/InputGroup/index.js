function InputGroup({label, placeholder, type, name, handleChange, value}) {
  if (type === 'textarea') {
    return (
        <div className='mb-3 input-group'>
            <label className='input-group-text'>{label}</label>
            <div style={{ position: 'relative' }}>
                <textarea
                    maxLength={255}
                    style={{ 
                        resize: 'none', 
                        height: '100px',  // Especifique a altura aqui
                        width: '100%'     // Opcional: Defina a largura para 100% para preencher o container
                    }}
                    rows="5"
                    cols="90"
                    placeholder={placeholder}
                    className='form-control'
                    name={name}
                    onChange={handleChange}
                    value={value}
                />
                <div 
                    style={{ 
                        position: 'absolute', 
                        bottom: 5, 
                        right: 10, 
                        fontSize: '0.8rem', 
                        color: '#888' 
                    }}
                >
                  {(value || "").length}/255
                </div>
            </div>
        </div>
    );
}

  
  return (
      <div className='mb-3 input-group'>
          <label className='input-group-text'>{label}</label>
          <input
              type={type}
              placeholder={placeholder}
              className='form-control'
              name={name}
              onChange={handleChange}
              value={value}
          />
      </div>
  );
}

export default InputGroup;