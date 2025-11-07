import { Op } from 'sequelize'
import Disponibilidade from '../../model/disponibilidadeModel.js'
import Usuarios from '../../model/usuarioModel.js'
import Agendamento from '../../model/agendamentoModel.js'

class ServiceBuscarServico {
  async index() {
    const barbeiros = await Usuarios.findAll({
      where: { role: 'BARBEIRO' },
      attributes: ['id', 'nome_usuario', 'email_usuario']
    })

    if (!barbeiros.length) throw new Error('Nenhum barbeiro encontrado')

    const mapNumToDia = {
      0: 'Dom', 1: 'Seg', 2: 'Ter', 3: 'Qua', 4: 'Qui', 5: 'Sex', 6: 'Sab'
    }

    const hoje = new Date()
    const limite = new Date()
    limite.setDate(hoje.getDate() + 30)

    const resultado = []

    for (const barbeiro of barbeiros) {
      
      const disponibilidades = await Disponibilidade.findAll({
        where: {
          user_id: barbeiro.id,
          status: { [Op.notIn]: ['indisponivel', 'folga'] }
        },
        attributes: ['dia_semana', 'hora_inicio', 'hora_fim']
      })

      if (!disponibilidades.length) continue

      const disponiveisPorData = []

      for (let d = new Date(hoje); d <= limite; d.setDate(d.getDate() + 1)) {
        const nomeDia = mapNumToDia[d.getDay()]
        if (nomeDia === 'Seg') continue

        const dispDoDia = disponibilidades.find(x => x.dia_semana === nomeDia)
        if (!dispDoDia) continue

        
        const horarios = gerarSlotsHorario(
          dispDoDia.hora_inicio,
          dispDoDia.hora_fim
        )

        
        const agendados = await Agendamento.findAll({
          where: {
            barbeiro_id: barbeiro.id,
            data: d.toISOString().split('T')[0],
            status: 'marcado'
          },
          attributes: ['hora']
        })

        const horasAgendadas = agendados.map(a => a.hora)
        const agora = new Date()

        const horariosDisponiveis = horarios.filter(h => {
          const [hora, minuto] = h.split(':').map(Number)
          const horarioData = new Date(d)
          horarioData.setHours(hora, minuto, 0, 0)

          const diferencaHoras =
            (horarioData - agora) / (1000 * 60 * 60)

          return (
            diferencaHoras >= 1 &&
            !horasAgendadas.includes(h)
          )
        })

        if (!horariosDisponiveis.length) continue

        disponiveisPorData.push({
          data: d.toISOString().split('T')[0],
          dia_semana: nomeDia,
          horarios: horariosDisponiveis
        })
      }

      if (disponiveisPorData.length) {
        resultado.push({
          barbeiro: {
            id: barbeiro.id,
            nome: barbeiro.nome_usuario,
            email: barbeiro.email_usuario
          },
          disponibilidade: disponiveisPorData
        })
      }
    }

    return resultado
  }
}

function gerarSlotsHorario(horaInicio, horaFim) {
  const [hIni] = horaInicio.split(':').map(Number)
  const [hFim] = horaFim.split(':').map(Number)

  const horarios = []
  for (let h = hIni; h < hFim; h++) {
    const hora = h.toString().padStart(2, '0')
    horarios.push(`${hora}:00`)
  }
  return horarios
}

export default new ServiceBuscarServico()
