import './EditProfile.css';

const EditProfile = () => {
    const handleSumit = (e) => {
        e.preventDefault()
    }
  return (
    <div>
        <h2>Edite seus dados</h2>
        <p>Adicione uma imagem de perfil e conte mais sobre você...</p>
        {/* preview da imagem */}
        <form onSubmit={handleSumit}>
            <input type="text" placeholder='Nome'/>
            <input type="email" placeholder='E-mail' disabled/>
            <label>
                <span>Imagem do Perfil</span>
                <input type="file" />
            </label>
            <label>
                <span>Bio:</span>
                <input type="text" placeholder='Descrição do perfil'/>
            </label>
            <label>
                <span>Quer alterar sua senha?</span>
                <input type="password" value="Digite a sua senha"/>
            </label>
            <input type="submit" value="Atualizar"/>
        </form>
    </div>
  )
}

export default EditProfile