import ServiceBuscarServico from "../../service/agendamento/serviceBuscarServico.js"

class BuscarServicoController{
    async index(req, res){
        try{
            const resultado = await ServiceBuscarServico.index()
            res.status(200).json(resultado)
        }catch(e){
            res.status(500).json({message: 'erro ao buscar serviço'})
        }
    }
}

export default new BuscarServicoController()