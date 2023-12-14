import { tcx } from "../../../../../../utils/tcx";
import { environment } from "../../../../../../../../environments/environment";

interface IVIP0TextProps {
  className?: string
}

export const VIP0Text = ({ className }: IVIP0TextProps) => {
  return (
    <div className={tcx('text-lg text-white font-medium', className)}>
      Bem-vindo ao {environment.platformName}! Como novo jogador, você está atualmente no Nível 0. Quer experimentar mais emoção e conteúdo exclusivo do jogo? Recarregue agora e suba de nível! Desbloqueie jogos de níveis superiores e recompensas exclusivas esperando por você. Clique em "Primeira recarga" para começar sua jornada para o próximo nível!
    </div>
  )
}
