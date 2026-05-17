
// Variável global para controlar se o Cordova está pronto
window.cordovaReady = false;

// Helper para carregar scripts dinamicamente (lazy loading)
window.loadScript = function(src) {
  return new Promise((resolve, reject) => {
    // Verificar se script já foi carregado
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

// Mapa de páginas e seus scripts
window.pageScripts = {
  '/index/': ['js/home/index.js'],
  '/home/': ['js/home/index.js'],
  '/pix/': ['area-pix/js/pix.js'],
  '/senha/': ['js/senha.js'],
  '/login/': ['js/login.js'],
  '/registrar-dispositivo/': ['js/registrar-dispositivo.js'],
  '/extrato/': ['js/extrato.js'],
  '/cartoes/': ['js/cartoes.js'],
  '/admin/': ['js/admin.js'],
  '/notificacoes/': ['js/notificacoes.js'],
  '/alterar-senha/': ['js/alterar-senha.js'],
  '/dados-pessoais/': ['js/dados-pessoais.js'],
  // Batch 1 - Rotas comuns
  '/extrato-limite/': ['js/extrato-limite.js'],
  '/score-credito/': ['js/registro-ponto.js'],
  '/vencimento-cartao/': ['js/vencimento-cartao.js'],
  '/limite/': ['js/limite.js'],
  '/mais/': ['js/index.js'],
  '/confirmar-missoes/': ['js/index.js'],
  '/missoes/': ['js/index.js'],
  '/recarga-celular/': ['js/index.js'],
  '/operadoras/': ['js/index.js'],
  '/valores/': ['js/index.js'],
  '/pagamento/': ['js/index.js'],
  '/parcelamento-recarga/': ['recarga-celular/js/parcelamento-recarga.js'],
  '/confirmacao-recarga/': ['recarga-celular/js/confirmacao-recarga.js'],
  '/cofrinhos/': ['js/cofrinhos.js'],
  '/cupons-desconto/': ['js/cupons-desconto.js'],
  '/libere-limite-informacoes/': ['js/libere-limite-informacoes.js'],
  '/informacoes-emprestimo/': ['js/informacoes-emprestimo.js'],
  '/gerenciar-assinatura-clube/': ['js/gerenciar-assinatura-clube.js'],
  '/meus-emprestimos/': ['js/meus-emprestimos.js'],
  '/detalhes-emprestimos-contratados/': ['js/detalhes-emprestimos-contratados.js'],
  '/resgate-cofrinhos/': ['js/resgate-cofrinhos.js'],
  '/reservar-cofrinho/': ['js/reservar-cofrinho.js'],
  '/reservar-cofrinho-sucesso/': ['js/reservar-cofrinho-sucesso.js'],
  '/criar-cofrinho/': ['js/criar-cofrinho.js'],
  '/cofrinho-criado/': ['js/cofrinho-criado.js'],
  '/carteira/': ['js/carteira.js'],
  '/checklist_users/': ['js/checklist_users.js'],
  '/historico-faturas/': ['js/historico-faturas.js'],
  '/negociacao-faturas/': ['js/negociacao-faturas.js'],
  '/pagar-fatura/': ['js/pagar-fatura.js'],
  '/detalhes-dados-para-pagamento-fatura/': ['js/detalhes-dados-para-pagamento-fatura.js'],
  '/pagamento-aprovado-fatura/': ['js/pagamento-aprovado-fatura.js'],
  '/pix-pagamento-fatura/': ['js/pix-pagamento-fatura.js'],
  '/boleto/': ['js/boleto.js'],
  '/detalhes-parcelamento/': ['js/detalhes-parcelamento.js'],
  '/taxas-usuario/': ['js/taxas-usuario.js'],
  '/lista-espera-cadastro/': ['js/lista-espera-cadastro.js'],
  '/confirmacao-indicacao/': ['js/index.js'],
  '/analisando-cadastro/': ['js/analisando-cadastro.js'],
  '/cadastro-endereco/': ['js/cadastro-endereco.js'],
  '/cadastro-pessoal/': ['js/cadastro-pessoal.js'],
  '/cadastro-vencimento/': ['js/cadastro-vencimento.js'],
  '/validar-facial/': ['js/validar-facial.js'],
  '/validar-face/': ['js/validar-face.js'],
  '/identidade-documento/': ['js/identidade-documento.js'],
  '/ranking/': ['js/ranking.js'],
  '/ativar-biometria/': ['js/ativar-biometria.js'],
  '/jogo-bonus/': ['js/jogo-bonus.js'],
  '/notas/': ['js/notas.js'],
  '/ver-nota/': ['js/ver-nota.js'],
  // PIX rotas
  '/depositar/': ['area-pix/js/historico-ponto.js'],
  '/deposito-pix/': ['area-pix/js/deposito-pix.js'],
  '/qr-scanner/': ['area-pix/js/qr-scanner.js'],
  '/meu-qr-code/': ['area-pix/js/meu-qr-code.js'],
  '/emprestimos/': ['js/emprestimos.js'],
  '/feed/': ['js/feed.js'],
  '/transferencia-processando/': ['area-pix/transferencia/js/transferencia-processando.js'],
  '/area-pix/destinatario-saque-limite/': ['js/index.js'],
  '/selecionar-banco/': ['js/index.js'],
  '/pix-copia-cola/': ['area-pix/copia-cola/js/pix-copia-cola.js'],
  '/pix-confirmacao/': ['area-pix/copia-cola/js/pix-confirmacao.js'],
  '/finalizacao-pix-copie-cola/': ['area-pix/copia-cola/js/finalizacao-pix-copie-cola.js'],
  '/pix-senha/': ['js/index.js'],
  '/pix-concluida/': ['js/index.js'],
  '/pix-receber/': ['js/index.js'],
  '/pix-receber-confirmacao/': ['js/index.js'],
  '/transferencia-opcoes/': ['area-pix/transferencia/js/opcoes.js'],
  '/destinatario-transferencia/': ['area-pix/js/destinatario-transferencia.js'],
  '/nosso-banco/': ['area-pix/transferencia/js/nosso-banco.js'],
  '/valor/': ['area-pix/transferencia/js/valor.js'],
  '/confirmacao-pix-out/': ['area-pix/transferencia/js/confirmacao-pix-out.js'],
  '/senha-transferencia/': ['area-pix/transferencia/js/senha-transferencia.js'],
  '/funcionalidades-outros-bancos/': ['js/index.js'],
  // Faturamento/Admin rotas
  '/senha-cartoes/': ['js/sheet-senha-admin.js'],
  '/cartao-virtual/': ['js/cartao-virtual.js'],
  '/cartoes-virtuais/': ['js/cartoes-virtuais.js'],
  '/cartao/': ['js/index.js'],
  '/metodos-verificacao/': ['js/metodos-verificacao.js'],
  '/metodos-verificacao-liberacao-dispositivo/': ['js/metodos-verificacao-liberacao-dispositivo.js'],
  '/validar-codigo-itoken/': ['js/validar-codigo-itoken.js'],
  '/termos/': ['js/index.js'],
  '/link2/': ['js/index.js'],
  '/link3/': ['js/index.js'],
  '/cadastro-chat/': ['js/chat.js'],
  '/cadastro-profissao/': ['js/index.js'],
  '/indicacao-todos/': ['js/indicacao-todos.js'],
  '/indicacao/': ['js/story-seletor.js'],
  '/configuracoes-usuario/': ['js/configuracoes-usuario.js'],
  '/meus-dispositivos/': ['js/story-preview.js'],
  '/dados-completos/': ['js/index.js'],
  '/editar-foto-perfil/': ['js/editar-foto-perfil.js'],
  '/suporte/': ['js/suporte.js'],
  '/app-em-atualizacao/': ['js/app-em-atualizacao.js'],
  '/beneficios/': ['js/beneficios.js'],
  '/solicitar-senha-atual/': ['js/solicitar-senha-atual.js'],
  '/nova-senha-cadastro/': ['js/criar-senha.js'],
  '/confirmacao-nova-senha/': ['js/index.js'],
  '/reenviar-codigo/': ['js/reenviar-codigo.js'],
  '/tela-app-teste/indicacao-teste/': ['js/indicacao-teste.js'],
  '/tela-app-teste/teste-score-credito/': ['js/score-credito.js'],
  '/verificar-codigo-whatsapp/': ['js/verificar-codigo-whatsapp.js'],
  '/verificar-codigo-email/': ['js/verificar-codigo-email.js'],
  '/ligacao/': ['js/ligacao.js'],
  '/pix-recebido/': ['js/pix-recebido.js'],
  '/devolver-pix/': ['js/devolver-pix.js'],
  '/confirmacao/': ['area-pix/transferencia/js/confirmacao.js'],
  '/overlay-sucesso/': ['area-pix/transferencia/js/overlay-sucesso.js'],
  '/boletos/': ['js/stories.js'],
  '/parcelamento/': ['area-pix/transferencia/js/parcelamento.js'],
  '/sucesso/': ['area-pix/transferencia/js/sucesso.js'],
  '/comprovante-transferencia/': ['area-pix/transferencia/js/comprovante-transferencia.js'],
  '/tela-app-teste/indicacao-teste/': ['js/indicacao-teste.js'],
  '/tela-app-teste/teste-score-credito/': ['js/score-credito.js'],
  '/alterar-dados/': ['js/alterar-dados.js'],
  '/senha-alterada/': ['js/senha-alterada.js'],
  '/conversas-usuarios/': ['js/conversas-usuarios.js'],
  '/chat/': ['js/chat.js'],
  '/pedir-convite/': ['js/pedir-convite.js'],
  '/pedido-realizado/': ['js/pedido-realizado.js'],
  '/solicitacao-em-analise/': ['js/solicitacao-em-analise.js'],
  '/solicitacao-reprovada/': ['js/solicitacao-reprovada.js'],
  '/solicitacao-pre-aprovada/': ['js/solicitacao-pre-aprovada.js'],
  '/usuario-esta-na-lista/': ['js/usuario-esta-na-lista.js'],
  '/frente-documento/': ['js/frente-documento.js'],
  '/verso-documento/': ['js/verso-documento.js'],
  '/analise-abertura-conta/': ['js/analise-abertura-conta.js'],
};

// Helper para carregar scripts de uma página
window.loadPageScripts = function(path) {
  const scripts = window.pageScripts[path] || [];
  return Promise.all(scripts.map(script => window.loadScript(script)));
};

//INICIALIZAÇÃO DO F7 QUANDO DISPOSITIVO ESTÁ PRONTO
// Só registrar evento deviceready se estivermos em ambiente Cordova
if (typeof cordova !== 'undefined' || window.location.protocol === 'file:') {
  document.addEventListener('deviceready', onDeviceReadyRoutes, false);
} else {
  // Para ambiente web, configurar imediatamente
  setTimeout(onDeviceReadyRoutes, 100);
}
var app = new Framework7({
  // App root element
  el: '#app',
  // App Name
  name: 'My App',
  // App id
  id: 'com.myapp.test',
  // Panel swipe removido - estava interferindo com o teclado
  panel: {
    swipe: false,
  },
  dialog: {
    buttonOk: 'Sim',
    buttonCancel: 'Cancelar',
  },
  // Configuração da statusbar (apenas Android)
  statusbar: {
    enabled: true,
    androidBackgroundColor: '#00000000',
    androidTextColor: 'default'
  },
  // Configuração do preloader
  preloader: {
    enabled: true,
    color: 'blue'
  },
  
  // Add default routes
  // Transições disponíveis: 'f7-fade', 'f7-push', 'f7-slide', 'f7-cover', 'f7-dive', 'f7-flip'
  routes: [
    {
      path: '/',
      url: 'splash.html',
      animate: false
    },
    {
      path: '/index/',
      url: 'index.html',
      animate: true,
      transition: 'f7-push',

      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/index/').then(() => {
            console.log('[ROUTES.JS] Script de home carregado');
            // Chamar inicialização após script carregar
            if (window.inicializarIndex) {
              window.inicializarIndex();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de home:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Configurar status bar translúcida para página index
          if (window.configurarStatusBarIndex) {
            window.configurarStatusBarIndex();
          }
          
          
          // Não carregar dados do usuário na página index de apresentação
        },
        pageBeforeOut: function (event, page) {
        // Resetar status bar quando sair da página index
        if (window.StatusBar) {
            StatusBar.overlaysWebView(false);
            StatusBar.backgroundColorByHexString('#00000000');
            StatusBar.styleDefault();
          }
          console.log('[routes.js] ===== index pageBeforeOut =====');
          console.log('[routes.js] - page.el:', page.el);
          console.log('[routes.js] - Página index saindo, estado atual:', {
            display: page.el ? window.getComputedStyle(page.el).display : 'N/A',
            classes: page.el ? page.el.className : 'N/A'
          });
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
        if (window.inicializarIndex) {
          window.inicializarIndex();
        } else {
          setTimeout(function() {
            if (window.inicializarIndex) {
              window.inicializarIndex();
            }
          }, 500);
        }
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        if (window.limparEventosIndex) {
          window.limparEventosIndex();
        }
        },
      }
    },
    {
      path: '/extrato-limite/',
      url: 'extrato-limite.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/extrato-limite/').then(() => {
            console.log('[ROUTES.JS] Script de extrato-limite carregado');
            if (window.inicializarExtratoLimite) {
              window.inicializarExtratoLimite();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de extrato-limite:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/score-credito/',
      url: 'registro-ponto.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/score-credito/').then(() => {
            console.log('[ROUTES.JS] Script de score-credito carregado');
            if (window.inicializarRegistroPonto) {
              console.log('[ROUTES.JS] Chamando inicializarRegistroPonto');
              window.inicializarRegistroPonto();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de score-credito:', err);
          });
        },
        pageBeforeRemove: function (event, page) {
          console.log('[ROUTES.JS] Página score-credito sendo removida, limpando Gauge');
          if (window.limparGauge) {
            window.limparGauge();
          }
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/clube-nandinho-pagamento/',
      url: 'clube-nandinho-pagamento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/clube-nandinho-pagamento/').then(() => {
            console.log('[ROUTES.JS] Script de clube-nandinho-pagamento carregado');
            if (window.inicializarClubeNandinhoPagamento) {
              console.log('[ROUTES.JS] Chamando inicializarClubeNandinhoPagamento');
              window.inicializarClubeNandinhoPagamento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de clube-nandinho-pagamento:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/clube-nandinho-ativo/',
      url: 'clube-nandinho-ativo.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/clube-nandinho-ativo/').then(() => {
            console.log('[ROUTES.JS] Script de clube-nandinho-ativo carregado');
            if (window.inicializarClubeNandinhoAtivo) {
              console.log('[ROUTES.JS] Chamando inicializarClubeNandinhoAtivo');
              window.inicializarClubeNandinhoAtivo();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de clube-nandinho-ativo:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/vencimento-cartao/',
      url: 'vencimento-cartao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/vencimento-cartao/').then(() => {
            console.log('[ROUTES.JS] Script de vencimento-cartao carregado');
            if (window.carregarDadosVencimento) {
              window.carregarDadosVencimento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de vencimento-cartao:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/limite/',
      url: 'limite.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/limite/').then(() => {
            console.log('[ROUTES.JS] Script de limite carregado');
            if (typeof window.limiteInicializar === 'function') {
              console.log('[ROUTES.JS] Chamando limiteInicializar');
              window.limiteInicializar();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de limite:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/mais/',
      url: 'mais.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
        // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // Atualizar dados sempre que voltar para a página mais
          setTimeout(() => {
            if (window.carregarDadosUsuario) {
              window.carregarDadosUsuario();
            }
          }, 100);
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
        
        // Carregar dados da página mais
        setTimeout(() => {
          if (window.carregarDadosUsuario) {
            window.carregarDadosUsuario();
          }
        }, 100);
        
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/confirmar-missoes/',
      url: 'confirmar-missoes.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/confirmar-missoes/').then(() => {
            console.log('[ROUTES.JS] Script de confirmar-missoes carregado');
            if (window.inicializarConfirmarMissoes) {
              window.inicializarConfirmarMissoes();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de confirmar-missoes:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/missoes/',
      url: 'missoes.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/missoes/').then(() => {
            console.log('[ROUTES.JS] Script de missões carregado');
            if (window.inicializarMissoes) {
              window.inicializarMissoes();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de missões:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/home/',
      url: 'home.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/home/').then(async () => {
            console.log('[ROUTES.JS] Script de home carregado');
            // Carregar dados da home logo após o script estar pronto
            if (window.carregarDadosUsuarioHome) {
              console.log('[ROUTES.JS] Carregando dados da home...');
              await window.carregarDadosUsuarioHome();
            }
            // Carregar avatares do ranking
            if (window.carregarAvatarsRankingHome) {
              console.log('[ROUTES.JS] Carregando avatares do ranking...');
              await window.carregarAvatarsRankingHome();
            }
            // Carregar últimas movimentações
            if (window.carregarUltimasMovimentacoes) {
              console.log('[ROUTES.JS] Carregando últimas movimentações...');
              await window.carregarUltimasMovimentacoes();
            }
            // Carregar novidades
            if (window.carregarNovidadesHome) {
              console.log('[ROUTES.JS] Carregando novidades...');
              await window.carregarNovidadesHome();
            }
            // Inicializar botões de like das novidades
            if (window.inicializarBotoesLikeNovidadesHome) {
              console.log('[ROUTES.JS] Inicializando botões de like das novidades...');
              window.inicializarBotoesLikeNovidadesHome();
            }
            // Carregar stories da equipe
            if (window.carregarStoriesHome) {
              console.log('[ROUTES.JS] Carregando stories...');
              await window.carregarStoriesHome();
            }
            // Carregar assinaturas RH
            if (window.rhCarregarAssinaturas) {
              window.rhCarregarAssinaturas();
            }
            // Avatares e badge do card de conversas
            if (window.atualizarAvatarsCardConversas) {
              window.atualizarAvatarsCardConversas();
            }
            if (window.atualizarBadgeMensagensHome) {
              window.atualizarBadgeMensagensHome();
            }
            if (window.atualizarBadgeSaldoCarteira) {
              window.atualizarBadgeSaldoCarteira();
            }
            // Atualizar badge do checklist_users
            if (window.atualizarBadgeChecklistUsers) {
              window.atualizarBadgeChecklistUsers();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de home:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Configurar navigation bar transparente com ícones escuros via StatusBar
          if (window.StatusBar) {
            // StatusBar também controla navigation bar em algumas versões
            StatusBar.overlaysWebView(true);
            StatusBar.backgroundColorByHexString('#00000000');
            StatusBar.styleDefault();
          }
          
          // Configurar listeners de Realtime quando a página home for exibida
          if (window.setupRealtimeListeners) {
            window.setupRealtimeListeners();
          }
          
          // Configurar listeners específicos da home
          if (window.setupHomeRealtimeListeners) {
            window.setupHomeRealtimeListeners();
          }
        },
        pageInit: function (event, page) {

          // Página já foi inicializada no pageBeforeIn
          
          // Definir função de atualizar indicadores se não existir
          if (!window.atualizarIndicadores) {
          window.atualizarIndicadores = function(activeIndex) {
            
            // Resetar TODOS os indicadores primeiro (forçar sempre para 8px)
            for (let i = 1; i <= 4; i++) {
              const indicador = document.getElementById(`indicador-${i}`);
              if (indicador) {
                indicador.style.width = '8px';
                indicador.style.height = '8px';
                indicador.style.borderRadius = '50%';
                indicador.style.transition = 'all 0.3s ease';
                
                if (i === activeIndex + 1) {
                  // Ativo: círculo azul
                  indicador.style.backgroundColor = 'var(--app-primary-color)';
                } else {
                  // Inativo: círculo cinza
                  indicador.style.backgroundColor = '#d1d5db';
                }
              }
            }
          };
        }

        // Função para esticar indicador durante transição
        if (!window.esticarIndicadorTransicao) {
          window.esticarIndicadorTransicao = function(currentIndex) {
            
            // Esticar APENAS o indicador atual (que está sendo substituído)
            const indicadorAtual = document.getElementById(`indicador-${currentIndex + 1}`);
            if (indicadorAtual) {
              indicadorAtual.style.width = '24px';
              indicadorAtual.style.height = '8px';
              indicadorAtual.style.borderRadius = '4px';
              indicadorAtual.style.backgroundColor = 'var(--app-primary-color)';
              indicadorAtual.style.transition = 'all 0.3s ease';
            }
          };
        }

        // Definir função de atualizar indicadores do carrossel de crédito se não existir
        if (!window.atualizarIndicadoresCredito) {
          window.atualizarIndicadoresCredito = function(activeIndex) {
            // Resetar todos os indicadores primeiro
            for (let i = 1; i <= 3; i++) {
              const indicador = document.getElementById(`indicador-credito-${i}`);
              if (indicador) {
                if (i === activeIndex + 1) {
                  // Ativo: círculo azul
                  indicador.style.width = '8px';
                  indicador.style.height = '8px';
                  indicador.style.borderRadius = '50%';
                  indicador.style.backgroundColor = '#1e40af';
                  indicador.style.transition = 'all 0.3s ease';
                } else {
                  // Inativo: círculo cinza
                  indicador.style.width = '8px';
                  indicador.style.height = '8px';
                  indicador.style.borderRadius = '50%';
                  indicador.style.backgroundColor = '#d1d5db';
                  indicador.style.transition = 'all 0.3s ease';
                }
              }
            }
          };
        }

        // Função para esticar indicador do carrossel de crédito durante transição
        if (!window.esticarIndicadorTransicaoCredito) {
          window.esticarIndicadorTransicaoCredito = function(currentIndex) {
            // Esticar APENAS o indicador atual (que está sendo substituído)
            const indicadorAtual = document.getElementById(`indicador-credito-${currentIndex + 1}`);
            if (indicadorAtual) {
              indicadorAtual.style.width = '24px';
              indicadorAtual.style.height = '8px';
              indicadorAtual.style.borderRadius = '4px';
              indicadorAtual.style.backgroundColor = '#1e40af';
              indicadorAtual.style.transition = 'all 0.3s ease';
            }
          };
        }

        // Inicializar swiper de indicação
        setTimeout(() => {
          const swiperContainer = document.querySelector('.indicacao-swiper');
          if (swiperContainer && window.app && app.swiper) {
            // Verificar se já existe uma instância do swiper
            if (!swiperContainer.swiper) {
              app.swiper.create('.indicacao-swiper', {
                slidesPerView: 1,
                spaceBetween: 8,
                freeMode: false,
                grabCursor: true,
                resistanceRatio: 0.85,
                autoplay: {
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                },
                loop: true,
                on: {
                  init: function() {
                    setTimeout(() => {
                      window.atualizarIndicadores(0);
                    }, 100);
                  },
                  slideChangeTransitionStart: function() {
                    // Esticar o indicador ATUAL (que está sendo substituído)
                    const currentIndex = this.previousIndex || 0;
                    window.esticarIndicadorTransicao(currentIndex);
                  },
                  slideChangeTransitionEnd: function() {
                    // Voltar ao estado final (círculos) após a transição
                    window.atualizarIndicadores(this.activeIndex);
                  },
                  slideChange: function() {
                    // Garantir que está no estado final
                    window.atualizarIndicadores(this.activeIndex);
                  }
                }
              });
            }
          }

          // Inicializar swiper de botões home
          const swiperBotoesHome = document.querySelector('.botoes-swiper');
          if (swiperBotoesHome && window.app && app.swiper) {
            // Verificar se já existe uma instância do swiper
            if (!swiperBotoesHome.swiper) {
              app.swiper.create('.botoes-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 8,
                freeMode: true,
                grabCursor: true,
                resistanceRatio: 0.85
              });
            }
          }

          // Inicializar swiper de crédito
          const swiperContainerCredito = document.querySelector('.indicacao-swiper-credito');
          if (swiperContainerCredito && window.app && app.swiper) {
            // Verificar se já existe uma instância do swiper
            if (!swiperContainerCredito.swiper) {
              app.swiper.create('.indicacao-swiper-credito', {
                slidesPerView: 1,
                spaceBetween: 16,
                freeMode: false,
                grabCursor: true,
                resistanceRatio: 0.85,
                on: {
                  init: function() {
                    setTimeout(() => {
                      window.atualizarIndicadoresCredito(0);
                    }, 100);
                  },
                  slideChangeTransitionStart: function() {
                    // Esticar o indicador ATUAL (que está sendo substituído)
                    const currentIndex = this.previousIndex || 0;
                    window.esticarIndicadorTransicaoCredito(currentIndex);
                  },
                  slideChangeTransitionEnd: function() {
                    // Voltar ao estado final (círculos) após a transição
                    window.atualizarIndicadoresCredito(this.activeIndex);
                  },
                  slideChange: function() {
                    // Garantir que está no estado final
                    window.atualizarIndicadoresCredito(this.activeIndex);
                  }
                }
              });
            }
          }

          // Inicializar swiper de feed stories
          const swiperFeedStoriesHome = document.querySelector('.ultimas-movimentacoes-swiper');
          if (swiperFeedStoriesHome && window.app && app.swiper) {
            if (!swiperFeedStoriesHome.swiper) {
              window.feedStoriesSwiper = app.swiper.create('.ultimas-movimentacoes-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 2,
                freeMode: true,
                grabCursor: true,
                resistanceRatio: 0.85
              });
            } else {
              window.feedStoriesSwiper = swiperFeedStoriesHome.swiper;
            }
          }

          // Inicializar swiper de promoções
          const swiperPromocoesHome = document.querySelector('.promocoes-swiper');
          if (swiperPromocoesHome && window.app && app.swiper) {
            if (!swiperPromocoesHome.swiper) {
              app.swiper.create('.promocoes-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 12,
                freeMode: true,
                grabCursor: true,
                resistanceRatio: 0.85
              });
            }
          }

          // Inicializar swiper do clube nandinho
          const swiperClubeNandinhoHome = document.querySelector('.clube-nandinho-swiper');
          if (swiperClubeNandinhoHome && window.app && app.swiper) {
            if (!swiperClubeNandinhoHome.swiper) {
              app.swiper.create('.clube-nandinho-swiper', {
                slidesPerView: 'auto',
                spaceBetween: 12,
                freeMode: true,
                grabCursor: true,
                resistanceRatio: 0.85
              });
            }
          }

          // O novo swiper horizontal de novidades é um Web Component (swiper-container)
          // e é populado dinamicamente via JavaScript, não requer inicialização manual
          
          // Função para atualizar indicadores de novidades

        }, 500);
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/recarga-celular/',
      url: 'recarga-celular/recarga-celular.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/recarga-celular/').then(async () => {
            console.log('[ROUTES.JS] Script de recarga-celular carregado');
            try {
              // Obter CPF do localStorage
              const cpf = localStorage.getItem('cpf_usuario');
              if (!cpf) {
                console.error('[ROUTES.JS] CPF não encontrado no localStorage');
                return;
              }
              
              // Buscar dados do usuário do localStorage
              const usuarioLogado = localStorage.getItem('usuarioLogado');
              let usuario = null;
              
              if (usuarioLogado) {
                usuario = JSON.parse(usuarioLogado);
              }
              
              // Se não tem no localStorage, buscar do banco via userService
              if (!usuario && window.userService) {
                usuario = await window.userService.getUserDataFromDB(cpf);
              }
              
              if (usuario && usuario.telefone) {
                // Atualizar número atual do usuário
                const numeroAtualElement = document.getElementById('numeroAtual');
                if (numeroAtualElement) {
                  numeroAtualElement.textContent = usuario.telefone;
                }
                
                // Atualizar nome do usuário (nome completo)
                const nomeUsuarioElement = document.getElementById('nomeUsuario');
                if (nomeUsuarioElement && usuario.nome) {
                  const primeiroNome = usuario.nome.split(' ')[0];
                  nomeUsuarioElement.textContent = primeiroNome;
                  localStorage.setItem('nome_usuario', usuario.nome);
                  console.log('[ROUTES.JS] Nome atualizado:', primeiroNome);
                }
              }
              
              // Inicializar página de recarga celular
              if (window.inicializarRecargaCelular) {
                console.log('[ROUTES.JS] Chamando inicializarRecargaCelular');
                window.inicializarRecargaCelular();
              }
            } catch (error) {
              console.error('[ROUTES.JS] Erro ao carregar dados do usuário:', error);
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de recarga-celular:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/operadoras/',
      url: 'recarga-celular/operadoras.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/operadoras/').then(() => {
            console.log('[ROUTES.JS] Script de operadoras carregado');
            if (window.inicializarOperadoras) {
              console.log('[ROUTES.JS] Chamando inicializarOperadoras');
              window.inicializarOperadoras();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de operadoras:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/valores/',
      url: 'recarga-celular/valores.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/valores/').then(() => {
            console.log('[ROUTES.JS] Script de valores carregado');
            if (window.inicializarValores) {
              console.log('[ROUTES.JS] Chamando inicializarValores');
              window.inicializarValores();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de valores:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/pagamento/',
      url: 'recarga-celular/pagamento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pagamento/').then(() => {
            console.log('[ROUTES.JS] Script de pagamento carregado');
            if (window.inicializarPagamento) {
              console.log('[ROUTES.JS] Chamando inicializarPagamento');
              window.inicializarPagamento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pagamento:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/parcelamento-recarga/',
      url: 'recarga-celular/parcelamento-recarga.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/parcelamento-recarga/').then(() => {
            console.log('[ROUTES.JS] Script de parcelamento-recarga carregado');
            if (window.inicializarParcelamentoRecarga) {
              window.inicializarParcelamentoRecarga();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de parcelamento-recarga:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/confirmacao-recarga/',
      url: 'recarga-celular/confirmacao-recarga.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/confirmacao-recarga/').then(() => {
            console.log('[ROUTES.JS] Script de confirmacao-recarga carregado');
            if (window.inicializarConfirmacaoRecargaCelular) {
              window.inicializarConfirmacaoRecargaCelular();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de confirmacao-recarga:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cofrinhos/',
      url: 'cofrinhos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cofrinhos/').then(() => {
            console.log('[ROUTES.JS] Script de cofrinhos carregado');
            if (window.inicializarPaginaCofrinhos) {
              window.inicializarPaginaCofrinhos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cofrinhos:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Os botões agora já estão no HTML da página, não precisam ser criados dinamicamente
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cupons-desconto/',
      url: 'cupons-desconto.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cupons-desconto/').then(() => {
            console.log('[ROUTES.JS] Script de cupons-desconto carregado');
            if (window.inicializarCuponsDesconto) {
              window.inicializarCuponsDesconto();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cupons-desconto:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/libere-limite-informacoes/',
      url: 'libere-limite-informacoes.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/libere-limite-informacoes/').then(() => {
            console.log('[ROUTES.JS] Script de libere-limite-informacoes carregado');
            if (window.inicializarLibereLimiteInformacoes) {
              window.inicializarLibereLimiteInformacoes();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de libere-limite-informacoes:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/informacoes-emprestimo/',
      url: 'informacoes-emprestimo.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/informacoes-emprestimo/').then(() => {
            console.log('[ROUTES.JS] Script de informacoes-emprestimo carregado');
            if (window.inicializarInformacoesEmprestimo) {
              window.inicializarInformacoesEmprestimo();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de informacoes-emprestimo:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/gerenciar-assinatura-clube/',
      url: 'gerenciar-assinatura-clube.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/gerenciar-assinatura-clube/').then(() => {
            console.log('[ROUTES.JS] Script de gerenciar-assinatura-clube carregado');
            if (window.inicializarGerenciarAssinatura) {
              window.inicializarGerenciarAssinatura();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de gerenciar-assinatura-clube:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/meus-emprestimos/',
      url: 'meus-emprestimos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/meus-emprestimos/').then(() => {
            console.log('[ROUTES.JS] Script de meus-emprestimos carregado');
            if (window.inicializarMeusEmprestimos) {
              window.inicializarMeusEmprestimos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de meus-emprestimos:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/detalhes-emprestimos-contratados/',
      url: 'detalhes-emprestimos-contratados.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/detalhes-emprestimos-contratados/').then(() => {
            console.log('[ROUTES.JS] Script de detalhes-emprestimos-contratados carregado');
            if (window.inicializarDetalhesEmprestimo) {
              window.inicializarDetalhesEmprestimo();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de detalhes-emprestimos-contratados:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/resgate-cofrinhos/',
      url: 'resgate-cofrinhos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/resgate-cofrinhos/').then(() => {
            console.log('[ROUTES.JS] Script de resgate-cofrinhos carregado');
            if (window.inicializarResgateCofrinhos) {
              window.inicializarResgateCofrinhos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de resgate-cofrinhos:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/reservar-cofrinho/',
      url: 'reservar-cofrinho.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/reservar-cofrinho/').then(() => {
            console.log('[ROUTES.JS] Script de reservar-cofrinho carregado');
            if (window.inicializarReservarCofrinho) {
              window.inicializarReservarCofrinho();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de reservar-cofrinho:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/reservar-cofrinho-sucesso/',
      url: 'reservar-cofrinho-sucesso.html',
      animate: true,
      transition: 'f7-dive',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/reservar-cofrinho-sucesso/').then(() => {
            console.log('[ROUTES.JS] Script de reservar-cofrinho-sucesso carregado');
            if (window.inicializarReservarCofrinhoSucesso) {
              window.inicializarReservarCofrinhoSucesso();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de reservar-cofrinho-sucesso:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/criar-cofrinho/',
      url: 'criar-cofrinho.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/criar-cofrinho/').then(() => {
            console.log('[ROUTES.JS] Script de criar-cofrinho carregado');
            if (window.inicializarCriarCofrinho) {
              window.inicializarCriarCofrinho();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de criar-cofrinho:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cofrinho-criado/',
      url: 'cofrinho-criado.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cofrinho-criado/').then(() => {
            console.log('[ROUTES.JS] Script de cofrinho-criado carregado');
            if (window.inicializarCofrinhoCriado) {
              window.inicializarCofrinhoCriado();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cofrinho-criado:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cartoes/',
      url: 'admin.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function(event, page) {
          window.loadPageScripts('/cartoes/').then(() => {
            console.log('[ROUTES.JS] Script de cartões carregado');
            // Inicializar página de cartões
            if (window.inicializarPaginaCartoes) {
              window.inicializarPaginaCartoes();
            }
            // Configurar listeners de Realtime para cartões
            if (window.setupCartoesRealtimeListeners) {
              console.log('[ROUTES.JS] Configurando listeners de Realtime para cartões');
              window.setupCartoesRealtimeListeners();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /cartoes/:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageAfterIn: function (event, page) {
          // Garantir que a página sempre re-execute a inicialização
          // ao ficar visível (útil quando volta da página de senha)
          if (window.inicializarFinalizacaoPixCopiecola) {
            try {
              window.inicializarFinalizacaoPixCopiecola();
            } catch (err) {
              console.error('[ROUTES.JS] Erro ao re-inicializar finalizacao-pix-copie-cola:', err);
            }
          } else {
            console.log('[ROUTES.JS] Função inicializarFinalizacaoPixCopiecola não encontrada no pageAfterIn');
          }
        },
        pageAfterIn: function (event, page) {
          // Página já foi exibida
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página cartões sendo removida');
          // Limpar eventos da página cartões
          if (window.limparEventosCartoes) {
            window.limparEventosCartoes();
          }
        },
      }
    },
    {
      path: '/admin/',
      url: 'admin.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function(event, page) {
          window.loadPageScripts('/admin/').then(() => {
            console.log('[ROUTES.JS] Script de admin carregado');
            // Inicializar página de admin
            if (window.inicializarPaginaAdmin) {
              window.inicializarPaginaAdmin();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /admin/:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página admin sendo removida');
        },
      }
    },
    {
      path: '/carteira/',
      url: 'carteira.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/carteira/').then(() => {
            console.log('[ROUTES.JS] Script de carteira carregado');
            if (window.inicializarPaginaCarteira) {
              window.inicializarPaginaCarteira();
            } else if (window.inicializarPaginaCashbacks) {
              window.inicializarPaginaCashbacks();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de carteira:', err);
          });
        },
        pageInit: function (event, page) {}
      }
    },
    {
      path: '/checklist_users/',
      url: 'checklist_users.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/checklist_users/').then(() => {
            console.log('[ROUTES.JS] Script de checklist_users carregado');
            if (window.inicializarChecklistUsers) {
              window.inicializarChecklistUsers();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de checklist_users:', err);
          });
        },
        pageInit: function (event, page) {}
      }
    },
    {
      path: '/historico-faturas/',
      url: 'historico-faturas.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/historico-faturas/').then(() => {
            console.log('[ROUTES.JS] Script de historico-faturas carregado');
            if (window.inicializarHistoricoFaturas) {
              window.inicializarHistoricoFaturas();
            }
            // Configurar listeners de Realtime para histórico de faturas
            if (window.setupFaturasRealtimeListeners) {
              console.log('[ROUTES.JS] Configurando listeners de Realtime para histórico de faturas');
              window.setupFaturasRealtimeListeners();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de historico-faturas:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página histórico-faturas sendo removida');
        },
      }
    },
    {
      path: '/detalhes-parcelamento/',
      url: 'detalhes-parcelamento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/detalhes-parcelamento/').then(() => {
            console.log('[ROUTES.JS] Script de detalhes-parcelamento carregado');
            if (window.inicializarDetalhesParcelamento) {
              window.inicializarDetalhesParcelamento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de detalhes-parcelamento:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página detalhes-parcelamento sendo removida');
        },
      }
    },
    {
      path: '/negociacao-faturas/',
      url: 'negociacao-faturas.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/negociacao-faturas/').then(() => {
            console.log('[ROUTES.JS] Script de negociacao-faturas carregado');
            if (window.inicializarNegociacaoFaturas) {
              window.inicializarNegociacaoFaturas();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de negociacao-faturas:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página negociacao-faturas sendo removida');
        },
      }
    },
    {
      path: '/taxas-usuario/',
      url: 'taxas-usuario.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/taxas-usuario/').then(() => {
            console.log('[ROUTES.JS] Script de taxas-usuario carregado');
            if (window.inicializarTaxasUsuario) {
              window.inicializarTaxasUsuario();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de taxas-usuario:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          console.log('[routes.js] Página taxas-usuario sendo removida');
        },
      }
    },
    {
      path: '/login/',
      url: 'login.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/login/').then(() => {
            console.log('[ROUTES.JS] Script de login carregado');
            // Inicializar página de login
            if (window.inicializarLogin) {
              window.inicializarLogin();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de login:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageAfterIn: function (event, page) {
          // Animações de entrada usando Dom7
          var $$ = Dom7;
          
          // Animar os blocos de conteúdo com efeito de entrada
          var blocks = $$('.page[data-name="login"] .page-content > .block');
          
          blocks.each(function(index) {
            var el = $$(this);
            // Definir opacity inicial como 0 e translateY como 30px
            el.css({
              opacity: 0,
              transform: 'translateY(30px)',
              transition: 'none'
            });
            
            // Animar com delay progressivo
            setTimeout(function() {
              el.css({
                transition: 'opacity 400ms ease-out, transform 400ms ease-out'
              });
              el.css({
                opacity: 1,
                transform: 'translateY(0px)'
              });
            }, index * 100);
          });
          
          // Animar o campo de CPF (dentro do .list)
          var cpfInput = $$('.page[data-name="login"] .item-input-outline');
          cpfInput.css({
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'none'
          });
          
          setTimeout(function() {
            cpfInput.css({
              transition: 'opacity 400ms ease-out, transform 400ms ease-out'
            });
            cpfInput.css({
              opacity: 1,
              transform: 'translateY(0px)'
            });
          }, 200);
          
          // Animar o divider "ou" com as linhas
          var divider = $$('.page[data-name="login"] .page-content > .px-6');
          divider.css({
            opacity: 0,
            transform: 'translateY(30px)',
            transition: 'none'
          });
          
          setTimeout(function() {
            divider.css({
              transition: 'opacity 400ms ease-out, transform 400ms ease-out'
            });
            divider.css({
              opacity: 1,
              transform: 'translateY(0px)'
            });
          }, 300);
          
          // Animar o campo de CPF com brilho azul ao focar
          $$('.page[data-name="login"] .item-input-outline input').on('focus', function() {
            var inputElement = $$(this).parents('.item-input-outline').eq(0);
            inputElement.css({
              '--f7-input-outline-border-color': '#1e40af'
            });
          });
          
          // Fazer toggle funcionar com clique
          var toggle = app.toggle.get('.page[data-name="login"] .toggle');
          if (toggle) {
            $$('.page[data-name="login"] .toggle').on('click', function() {
              toggle.toggle();
            });
          }
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosLogin) {
            window.limparEventosLogin();
          }
        },
      }
    },
    {
      path: '/lista-espera-cadastro/',
      url: 'lista-espera-cadastro.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/lista-espera-cadastro/').then(() => {
            console.log('[ROUTES.JS] Script de lista-espera-cadastro carregado');
            if (window.inicializarListaEsperaCadastro) {
              window.inicializarListaEsperaCadastro();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de lista-espera-cadastro:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosListaEsperaCadastro) {
            window.limparEventosListaEsperaCadastro();
          }
        },
      }
    },
    {
      path: '/confirmacao-indicacao/',
      url: 'confirmacao-indicacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/confirmacao-indicacao/').then(() => {
            console.log('[ROUTES.JS] Script de confirmacao-indicacao carregado');
            if (window.inicializarConfirmacaoIndicacao) {
              window.inicializarConfirmacaoIndicacao();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de confirmacao-indicacao:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/analisando-cadastro/',
      url: 'analisando-cadastro.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/analisando-cadastro/').then(() => {
            console.log('[ROUTES.JS] Script de analisando-cadastro carregado');
            if (window.inicializarAnalisandoCadastro) {
              window.inicializarAnalisandoCadastro();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de analisando-cadastro:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cadastro-endereco/',
      url: 'cadastro-endereco.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cadastro-endereco/').then(() => {
            console.log('[ROUTES.JS] Script de cadastro-endereco carregado');
            if (window.inicializarCadastroEndereco) {
              window.inicializarCadastroEndereco();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cadastro-endereco:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/cadastro-pessoal/',
      url: 'cadastro-pessoal.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cadastro-pessoal/').then(() => {
            console.log('[ROUTES.JS] Script de cadastro-pessoal carregado');
            if (window.inicializarCadastroPessoal) {
              window.inicializarCadastroPessoal();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cadastro-pessoal:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosCadastroPessoal) {
            window.limparEventosCadastroPessoal();
          }
        },
      }
    },
    {
      path: '/cadastro-vencimento/',
      url: 'cadastro-vencimento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cadastro-vencimento/').then(() => {
            console.log('[ROUTES.JS] Script de cadastro-vencimento carregado');
            if (window.inicializarCadastroVencimento) {
              window.inicializarCadastroVencimento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cadastro-vencimento:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosCadastroVencimento) {
            window.limparEventosCadastroVencimento();
          }
        },
      }
    },
    {
      path: '/validar-facial/',
      url: 'validar-facial.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/validar-facial/').then(() => {
            console.log('[ROUTES.JS] Script de validar-facial carregado');
            if (window.inicializarValidarFacial) {
              window.inicializarValidarFacial();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de validar-facial:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosValidarFacial) {
            window.limparEventosValidarFacial();
          }
        },
      }
    },
    {
      path: '/validar-face/',
      url: 'validar-face.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/validar-face/').then(() => {
            console.log('[ROUTES.JS] Script de validar-face carregado');
            if (window.inicializarValidarFace) {
              window.inicializarValidarFace();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de validar-face:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosValidarFace) {
            window.limparEventosValidarFace();
          }
        },
      }
    },
    {
      path: '/identidade-documento/',
      url: 'identidade-documento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/identidade-documento/').then(() => {
            console.log('[ROUTES.JS] Script de identidade-documento carregado');
            if (window.inicializarIdentidadeDocumento) {
              window.inicializarIdentidadeDocumento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de identidade-documento:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosIdentidadeDocumento) {
            window.limparEventosIdentidadeDocumento();
          }
        },
      }
    },
    {
      path: '/ranking/',
      url: 'ranking.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/ranking/').then(() => {
            console.log('[ROUTES.JS] Script de ranking carregado');
            if (window.inicializarRanking) {
              window.inicializarRanking();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de ranking:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosRanking) {
            window.limparEventosRanking();
          }
        },
      }
    },
    {
      path: '/jogo-bonus/',
      url: 'jogo-bonus.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/jogo-bonus/').then(() => {
            console.log('[ROUTES.JS] Script de jogo-bonus carregado');
            if (window.inicializarJogoBonus) {
              window.inicializarJogoBonus();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de jogo-bonus:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar jogo
          if (window.limparJogoBonus) {
            window.limparJogoBonus();
          }
        },
      }
    },
    {
      path: '/notas/',
      url: 'notas.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/notas/').then(() => {
            console.log('[ROUTES.JS] Script de notas carregado');
            if (window.inicializarNotas) {
              window.inicializarNotas();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de notas:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/ver-nota/',
      url: 'ver-nota.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/ver-nota/').then(() => {
            console.log('[ROUTES.JS] Script de ver-nota carregado');
            if (window.inicializarVerNota) {
              window.inicializarVerNota();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de ver-nota:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/ativar-biometria/',
      url: 'ativar-biometria.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/ativar-biometria/').then(() => {
            console.log('[ROUTES.JS] Script de ativar-biometria carregado');
            if (window.inicializarAtivarBiometria) {
              window.inicializarAtivarBiometria();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de ativar-biometria:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosAtivarBiometria) {
            window.limparEventosAtivarBiometria();
          }
        }
      }
    },
    {
      path: '/senha/',
      url: 'senha.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Limpar flag de biometria para que seja solicitada novamente nesta página
          sessionStorage.removeItem('biometria_solicitada_nesta_sessao');
          
          // Script de senha já carregado no index.html pois depende de funções da index
          console.log('[ROUTES.JS] Página de senha carregada');
          // Chamar inicialização
          if (window.inicializarSenha) {
            window.inicializarSenha();
          }
          // Iniciar polling para iToken
          if (window.iniciarPollingIToken) {
            window.iniciarPollingIToken();
          }
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosSenha) {
            window.limparEventosSenha();
          }
          // Parar polling quando sair da página
          if (window.pararPollingIToken) {
            window.pararPollingIToken();
          }
        },
      }
    },

    {
      path: '/registrar-dispositivo/',
      url: 'registrar-dispositivo.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/registrar-dispositivo/').then(() => {
            console.log('[ROUTES.JS] Script de registrar-dispositivo carregado');
            if (window.inicializarRegistrarDispositivo) {
              window.inicializarRegistrarDispositivo();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de registrar-dispositivo:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar estados se necessário
        },
      }
    },

    {
      path: '/pix/',
              url: 'area-pix/pix.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/pix/').then(async () => {
            console.log('[ROUTES.JS] Script de pix carregado');
            if (window.inicializarPix) {
              console.log('[ROUTES.JS] Inicializando PIX...');
              await window.inicializarPix();
            }
            // Carregar assinaturas RH
            if (window.rhCarregarAssinaturas) {
              window.rhCarregarAssinaturas();
            }
            if (window.pixAtualizarContadores) {
              window.pixAtualizarContadores();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix:', err);
          });
        },
        pageInit: function (event, page) {
          // Inicialização feita no pageBeforeIn após script carregar
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosPix) {
            window.limparEventosPix();
          }
        },
      }
    },
    {
      path: '/depositar/',
      url: 'area-pix/historico-ponto.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          app.preloader.show();
          window.loadPageScripts('/depositar/');
        },
        pageAfterIn: function (event, page) {
          app.preloader.hide();
          if (window.inicializarDepositar) {
            window.inicializarDepositar(page.el);
          }
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosDepositar) {
            window.limparEventosDepositar();
          }
        },
      }
    },
    {
      path: '/deposito-pix/',
      url: 'area-pix/deposito-pix.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/deposito-pix/').then(() => {
            console.log('[ROUTES.JS] Script de deposito-pix carregado');
            if (window.inicializarDepositoPix) {
              window.inicializarDepositoPix();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de deposito-pix:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosDepositoPix) {
            window.limparEventosDepositoPix();
          }
        },
      }
    },
    {
      path: '/qr-scanner/',
      url: 'area-pix/qr-scanner.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: async function (event, page) {
          try {
            await window.loadPageScripts('/qr-scanner/');
            console.log('[ROUTES.JS] Script de qr-scanner carregado');
            if (window.qrScannerInicializarQrScanner) {
              await window.qrScannerInicializarQrScanner();
            }
          } catch (err) {
            console.error('[ROUTES.JS] Erro ao carregar script de qr-scanner:', err);
          }
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.qrScannerLimparEventosQrScanner) {
            window.qrScannerLimparEventosQrScanner();
          }
        },
      }
    },
    {
      path: '/meu-qr-code/',
      url: 'area-pix/meu-qr-code.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/meu-qr-code/').then(() => {
            console.log('[ROUTES.JS] Script de meu-qr-code carregado');
            // Configurar listeners de Realtime para meu-qr-code
            if (window.setupMeuQrCodeRealtimeListeners) {
              console.log('[ROUTES.JS] Configurando listeners de Realtime para meu-qr-code');
              window.setupMeuQrCodeRealtimeListeners();
            }
            
            if (window.inicializarMeuQrCode) {
              console.log('[ROUTES.JS] Chamando inicializarMeuQrCode...');
              window.inicializarMeuQrCode();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de meu-qr-code:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosMeuQrCode) {
            window.limparEventosMeuQrCode();
          }
        },
      }
    },
    {
      path: '/emprestimos/',
      url: 'emprestimos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/emprestimos/').then(() => {
            console.log('[ROUTES.JS] Script de emprestimos carregado');
            // Configurar listeners de Realtime para emprestimos
            if (window.setupSaqueLimiteRealtimeListeners) {
              console.log('[ROUTES.JS] Configurando listeners de Realtime para emprestimos');
              window.setupSaqueLimiteRealtimeListeners();
            }
            
            if (window.inicializarEmprestimos) {
              window.inicializarEmprestimos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de emprestimos:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Verificar conta selecionada quando página é montada (apenas se houver conta no localStorage)
          const contaSelecionada = localStorage.getItem('contaSelecionadaSaque');
          if (contaSelecionada && window.verificarContaSelecionadaSaque) {
            window.verificarContaSelecionadaSaque();
          }
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosSaqueLimite) {
            window.limparEventosSaqueLimite();
          }
        },
      }
    },
    {
      path: '/feed/',
      url: 'feed.html',
      animate: true,
      transition: 'f7-cover-v',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/feed/').then(() => {
            if (window.inicializarFeed) {
              window.inicializarFeed();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de feed:', err);
          });
        },
        pageInit: function (event, page) {}
      }
    },
    {
      path: '/transferencia-processando/',
      url: 'area-pix/transferencia/transferencia-processando.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/transferencia-processando/').then(() => {
            console.log('[ROUTES.JS] Script de transferencia-processando carregado');
            if (window.inicializarPaginaTransferenciaProcessando) {
              console.log('[ROUTES.JS] Chamando inicialização da página de transferência processando');
              window.inicializarPaginaTransferenciaProcessando();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de transferencia-processando:', err);
          });
        }
      }
    },
    {
      path: '/area-pix/destinatario-saque-limite/',
      url: 'area-pix/destinatario-saque-limite.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/area-pix/destinatario-saque-limite/').then(() => {
            console.log('[ROUTES.JS] Script de destinatario-saque-limite carregado');
            if (window.inicializarDestinatarioSaqueLimite) {
              window.inicializarDestinatarioSaqueLimite();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de destinatario-saque-limite:', err);
          });
        },
        pageAfterIn: function (event, page) {
            console.log('[ROUTES.JS] Página destinatario-saque-limite carregada via pageAfterIn');
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosDestinatarioSaqueLimite) {
            window.limparEventosDestinatarioSaqueLimite();
          }
        },
      }
    },
    {
      path: '/selecionar-banco/',
      url: 'area-pix/selecionar-banco.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/selecionar-banco/').then(() => {
            console.log('[ROUTES.JS] Script de selecionar-banco carregado');
            if (window.inicializarSelecionarBanco) {
              window.inicializarSelecionarBanco();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de selecionar-banco:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/pix-copia-cola/',
              url: 'area-pix/copia-cola/pix-copia-cola.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-copia-cola/').then(() => {
            console.log('[ROUTES.JS] Script de pix-copia-cola carregado');
            if (window.inicializarPixCopiaCola) {
              window.inicializarPixCopiaCola();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-copia-cola:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosPixCopiaCola) {
            window.limparEventosPixCopiaCola();
          }
        }
      }
    },
    {
      path: '/pix-confirmacao/',
              url: 'area-pix/copia-cola/pix-confirmacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-confirmacao/').then(() => {
            console.log('[ROUTES.JS] Script de pix-confirmacao carregado');
            if (window.inicializarPixConfirmacao) {
              window.inicializarPixConfirmacao();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-confirmacao:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosPixConfirmacao) {
            window.limparEventosPixConfirmacao();
          }
        }
      }
    },
    {
      path: '/finalizacao-pix-copie-cola/',
              url: 'area-pix/copia-cola/finalizacao-pix-copie-cola.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/finalizacao-pix-copie-cola/').then(async () => {
            console.log('[ROUTES.JS] Script de finalizacao-pix-copie-cola carregado');
            if (window.inicializarFinalizacaoPixCopiecola) {
              console.log('[ROUTES.JS] Inicializando finalizacao-pix-copie-cola...');
              await window.inicializarFinalizacaoPixCopiecola();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de finalizacao-pix-copie-cola:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosFinalizacaoPixCopiecola) {
            window.limparEventosFinalizacaoPixCopiecola();
          }
        }
      }
    },
    {
      path: '/pix-senha/',
      url: 'area-pix/copia-cola/pix-senha.html',
      animate: true,
      transition: 'f7-cover-v',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-senha/').then(() => {
            console.log('[ROUTES.JS] Script de pix-senha carregado');
            if (window.inicializarPixSenha) {
              window.inicializarPixSenha();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-senha:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosPixSenha) {
            window.limparEventosPixSenha();
          }
        }
      }
    },
    {
      path: '/pix-concluida/',
      url: 'area-pix/copia-cola/pix-concluida.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-concluida/').then(() => {
            console.log('[ROUTES.JS] Script de pix-concluida carregado');
            if (window.inicializarPixConcluida) {
              window.inicializarPixConcluida();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-concluida:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosPixConcluida) {
            window.limparEventosPixConcluida();
          }
        }
      }
    },
    {
      path: '/pix-receber/',
              url: 'area-pix/receber/pix-receber.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-receber/').then(() => {
            console.log('[ROUTES.JS] Script de pix-receber carregado');
            if (window.inicializarPixReceber) {
              window.inicializarPixReceber();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-receber:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosPixReceber) {
            window.limparEventosPixReceber();
          }
        }
      }
    },
    {
      path: '/pix-receber-confirmacao/',
              url: 'area-pix/receber/pix-receber-confirmacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/pix-receber-confirmacao/').then(() => {
            console.log('[ROUTES.JS] Script de pix-receber-confirmacao carregado');
            if (window.inicializarPixReceberConfirmacao) {
              window.inicializarPixReceberConfirmacao();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de pix-receber-confirmacao:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosPixReceberConfirmacao) {
            window.limparEventosPixReceberConfirmacao();
          }
        }
      }
    },
    {
      path: '/transferencia-opcoes/',
      url: 'area-pix/transferencia/opcoes.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/transferencia-opcoes/').then(() => {
            console.log('[ROUTES.JS] Script de transferencia-opcoes carregado');
            if (window.selecionarTipoTransferencia) {
              console.log('[ROUTES.JS] Script carregado - funcões disponíveis');
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de transferencia-opcoes:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosTransferenciaOpcoes) {
            window.limparEventosTransferenciaOpcoes();
          }
        }
      }
    },
    {
      path: '/destinatario-transferencia/',
      url: 'area-pix/transferencia/destinatario-transferencia.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/destinatario-transferencia/').then(() => {
            console.log('[ROUTES.JS] Script de destinatario-transferencia carregado');
            if (window.inicializarDestinatarioPixOutTransferencia) {
              window.inicializarDestinatarioPixOutTransferencia();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de destinatario-transferencia:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosDestinatarioTransferencia) {
            window.limparEventosDestinatarioTransferencia();
          }
        }
      }
    },
    {
      path: '/nosso-banco/',
      url: 'area-pix/transferencia/nosso-banco.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/nosso-banco/').then(() => {
            console.log('[ROUTES.JS] Script de nosso-banco carregado');
            if (window.inicializarNossoBanco) {
              window.inicializarNossoBanco();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de nosso-banco:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosNossoBanco) {
            window.limparEventosNossoBanco();
          }
        }
      }
    },
    {
      path: '/funcionalidades-outros-bancos/',
      url: 'area-pix/transferencia/funcionalidades-outros-bancos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/funcionalidades-outros-bancos/').then(() => {
            console.log('[ROUTES.JS] Script de funcionalidades-outros-bancos carregado');
            if (window.inicializarFuncionalidadesOutrosBancos) {
              window.inicializarFuncionalidadesOutrosBancos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de funcionalidades-outros-bancos:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosFuncionalidadesOutrosBancos) {
            window.limparEventosFuncionalidadesOutrosBancos();
          }
        }
      }
    },
            {
              path: '/valor/',
              url: 'area-pix/transferencia/valor.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/valor/').then(() => {
                    console.log('[ROUTES.JS] Script de valor carregado');
                    if (window.inicializarValor) {
                      window.inicializarValor();
                    }
                  }).catch(err => {
                    console.error('[ROUTES.JS] Erro ao carregar script de valor:', err);
                  });
                },
                pageInit: function (event, page) {
                  // Página já foi inicializada no pageBeforeIn
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosValor) {
                    window.limparEventosValor();
                  }
                }
              }
            },
            {
              path: '/boletos/',
              url: 'stories.html',
              animate: true,
              transition: 'f7-cover-v',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/boletos/').then(() => {
                    console.log('[ROUTES.JS] Script de boletos carregado');
                    if (window.inicializarBoletos) {
                      window.inicializarBoletos();
                    }
                  });
                }
              }
            },
            {
              path: '/confirmacao/',
              url: 'area-pix/transferencia/confirmacao.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/confirmacao/').then(() => {
                    console.log('[ROUTES.JS] Scripts de confirmacao carregados');
                  }).catch((err) => {
                    console.error('[ROUTES.JS] Erro ao carregar scripts de confirmacao:', err);
                  });
                },
                pageInit: function (event, page) {
                },
                pageAfterIn: function (event, page) {
                  // Quando volta da página de senha, verificar se senha foi validada e processar transferência
                  const senhaValidada = localStorage.getItem('senha_transferencia_validada');
                  if (senhaValidada === 'true') {
                    console.log('[routes.js] Senha validada detectada ao voltar para confirmação, preparando slider...');
                    
                    // Preparar slider IMEDIATAMENTE para ocultar texto e centralizar círculo
                    setTimeout(() => {
                      const fill = document.getElementById('confirmSliderFill');
                      const slider = document.getElementById('confirmSlider');
                      const handle = document.getElementById('confirmSliderHandle');
                      const loadingContainer = document.getElementById('sliderLoadingContainer');
                      const arrowIcon = document.getElementById('sliderArrowIcon');
                      const label = document.getElementById('confirmSliderLabel');
                      
                      if (fill && slider && handle && loadingContainer && arrowIcon && label) {
                        // Ocultar texto imediatamente
                        label.style.opacity = '0';
                        label.style.transition = 'opacity 0.1s';
                        
                        // Centralizar círculo imediatamente
                        handle.style.transition = 'left 0.1s ease-out';
                        handle.style.left = '50%';
                        handle.style.transform = 'translateX(-50%)';
                        
                        // Ocultar fill azul imediatamente
                        fill.style.width = '0px';
                        fill.style.transition = 'width 0.1s';
                        
                        // Ocultar seta e mostrar loading
                        arrowIcon.style.display = 'none';
                        loadingContainer.style.display = 'flex';
                        loadingContainer.style.opacity = '1';
                        
                        // Encolher slider para tamanho do círculo
                        slider.style.transition = 'width 0.1s ease-out';
                        slider.style.width = handle.clientWidth + 'px';
                        slider.style.margin = '0 auto';
                      }
                      
                      // Processar transferência após preparar visualmente
                      setTimeout(() => {
                        if (window.processarTransferenciaComProgressoTransferenciaConfirmacao) {
                          window.processarTransferenciaComProgressoTransferenciaConfirmacao();
                        } else {
                          console.error('[routes.js] Função processarTransferenciaComProgressoTransferenciaConfirmacao não encontrada');
                        }
                      }, 150);
                    }, 100);
                  } else {
                    // Quando voltar para a página de confirmação (ex: do parcelamento), recarregar dados
                    console.log('[routes.js] Voltando para página de confirmação - recarregando dados...');
                    setTimeout(() => {
                      if (window.inicializarConfirmacao) {
                        window.inicializarConfirmacao();
                      } else {
                        console.log('[routes.js] Função inicializarConfirmacao não encontrada para recarregar');
                      }
                    }, 100);
                  }
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosConfirmacao) {
                    window.limparEventosConfirmacao();
                  }
                }
              }
            },
            {
              path: '/senha-transferencia/',
              url: 'area-pix/transferencia/senha-transferencia.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/senha-transferencia/').then(() => {
                    console.log('[ROUTES.JS] Script de senha-transferencia carregado');
                    if (window.inicializarSenhaTransferencia) {
                      window.inicializarSenhaTransferencia();
                    }
                  });
                }
              }
            },
            {
              path: '/confirmacao-pix-out/',
              url: 'area-pix/transferencia/confirmacao-pix-out.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/confirmacao-pix-out/').then(() => {
                    console.log('[ROUTES.JS] Script de confirmacao-pix-out carregado');
                    if (window.inicializarConfirmacaoPixOut) {
                      window.inicializarConfirmacaoPixOut();
                    }
                  }).catch(err => {
                    console.error('[ROUTES.JS] Erro ao carregar script de confirmacao-pix-out:', err);
                  });
                },
                pageBeforeOut: function (event, page) {
                  // Quando sair da página de confirmação PIX OUT, limpar eventos e resetar estado
                  if (window.limparEventosConfirmacaoPixOut) {
                    window.limparEventosConfirmacaoPixOut();
                  }
                },
                pageInit: function (event, page) {
                  // Página já foi inicializada no pageBeforeIn
                },
                pageAfterIn: function (event, page) {
                  // Quando volta da página de senha, verificar se senha foi validada e processar PIX OUT
                  const senhaValidada = localStorage.getItem('senha_transferencia_validada');
                  if (senhaValidada === 'true') {
                    console.log('[ROUTES.JS] 🔐 Senha validada detectada - Verificando se há transferência em processamento');
                    
                    // Verificar se há transferência em processamento
                    const sucessoIdTransferencia = localStorage.getItem('sucesso_id_transferencia');
                    const preloader = document.getElementById('preloaderOverlay');
                    
                    if (sucessoIdTransferencia && preloader) {
                      console.log('[ROUTES.JS] 📦 Transferência em processamento - Mostrando preloader');
                      preloader.style.display = 'flex';
                      // Continuar monitorando o status
                      setTimeout(() => {
                        if (window.monitorarStatusTransferencia) {
                          window.monitorarStatusTransferencia(sucessoIdTransferencia, 5000);
                        }
                      }, 100);
                    } else {
                      console.log('[ROUTES.JS] ▶️ Processando PIX OUT normalmente');
                      // Mostrar preloader e processar PIX OUT
                      if (preloader) {
                        preloader.style.display = 'flex';
                      }
                      
                      // Processar PIX OUT
                      setTimeout(() => {
                        if (window.processarPixOut) {
                          window.processarPixOut();
                        } else {
                          console.error('[ROUTES.JS] Função processarPixOut não encontrada');
                        }
                      }, 100);
                    }
                  }
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosConfirmacaoPixOut) {
                    window.limparEventosConfirmacaoPixOut();
                  }
                }
              }
            },
            {
              path: '/parcelamento/',
              url: 'area-pix/transferencia/parcelamento.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/parcelamento/').then(async () => {
                    console.log('[ROUTES.JS] Script de parcelamento carregado');
                    if (window.inicializarParcelamento) {
                      console.log('[ROUTES.JS] Inicializando parcelamento...');
                      await window.inicializarParcelamento();
                    }
                  }).catch(err => {
                    console.error('[ROUTES.JS] Erro ao carregar script de parcelamento:', err);
                  });
                },
                pageInit: function (event, page) {
                  // Página já foi inicializada no pageBeforeIn
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosParcelamento) {
                    window.limparEventosParcelamento();
                  }
                }
              }
            },
            {
              path: '/overlay-sucesso/',
              url: 'area-pix/transferencia/overlay-sucesso.html',
              animate: true,
              transition: 'f7-dive',
              on: {
                pageBeforeIn: function (event, page) {
                  window.loadPageScripts('/overlay-sucesso/').then(() => {
                    console.log('[ROUTES.JS] Scripts de overlay-sucesso carregados');
                    if (window.inicializarOverlaySucesso) {
                      window.inicializarOverlaySucesso();
                    } else {
                      console.log('[ROUTES.JS] Função inicializarOverlaySucesso não encontrada');
                    }
                  }).catch((err) => {
                    console.error('[ROUTES.JS] Erro ao carregar scripts de overlay-sucesso:', err);
                  });
                }
              }
            },
            {
              path: '/sucesso/',
              url: 'area-pix/transferencia/sucesso.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageInit: function (event, page) {
                  if (window.inicializarSucesso) {
                    window.inicializarSucesso();
                  } else {
                    console.log('[routes.js] Função inicializarSucesso não encontrada');
                  }
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosSucesso) {
                    window.limparEventosSucesso();
                  }
                }
              }
            },
            {
              path: '/comprovante-transferencia/',
              url: 'comprovante-transferencia.html',
              animate: true,
              transition: 'f7-push',
              on: {
                pageInit: function (event, page) {
                  if (window.inicializarComprovante) {
                    window.inicializarComprovante();
                  } else {
                    console.log('[routes.js] Função inicializarComprovante não encontrada');
                  }
                },
                pageBeforeRemove: function (event, page) {
                  if (window.limparEventosComprovante) {
                    window.limparEventosComprovante();
                  }
                },
                pageAfterIn: function (event, page) {
                  // fazer algo depois da página ser exibida
                }
              }
            },
    {
      path: '/senha-cartoes/',
      url: 'senha-cartoes.html',
      animate: true,
      transition: 'f7-cover-v',
      on: {
        pageInit: function (event, page) {
          if (window.inicializarSenhaCartoes) {
            window.inicializarSenhaCartoes();
          } else {
            setTimeout(function() {
              if (window.inicializarSenhaCartoes) {
                window.inicializarSenhaCartoes();
              }
            }, 500);
          }
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosSenhaCartoes) {
            window.limparEventosSenhaCartoes();
          }
        },
      }
    },
    {
      path: '/cartao-virtual/',
      url: 'cartao-virtual.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          console.log('[routes.js] Página cartao-virtual inicializada');
          
          // Configurar listeners de Realtime para cartão virtual
          if (window.setupCartaoRealtimeListeners) {
            console.log('[ROUTES.JS] Configurando listeners de Realtime para cartão virtual');
            window.setupCartaoRealtimeListeners();
          }
          
          // Inicializar funcionalidades do cartão virtual
          if (window.inicializarCartaoVirtual) {
            window.inicializarCartaoVirtual();
          } else {
            console.log('[routes.js] Função inicializarCartaoVirtual não encontrada');
          }
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosCartaoVirtual) {
            window.limparEventosCartaoVirtual();
          }
        },
      }
    },
    {
      path: '/cartoes-virtuais/',
      url: 'cartao-virtual.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          console.log('[routes.js] Página cartoes-virtuais inicializada');
          // Inicializar funcionalidades do cartão virtual
          if (window.inicializarCartaoVirtual) {
            window.inicializarCartaoVirtual();
          } else {
            setTimeout(function() {
              if (window.inicializarCartaoVirtual) {
                window.inicializarCartaoVirtual();
              }
            }, 500);
          }
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosCartaoVirtual) {
            window.limparEventosCartaoVirtual();
          }
        },
      }
    },
    {
      path: '/cartao/',
      url: 'cartao-virtual.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
          // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // fazer algo quando a página for inicializada
          console.log('[routes.js] Página cartao-virtual inicializada');
          // Inicializar funcionalidades do cartão virtual
          if (window.inicializarCartaoVirtual) {
            window.inicializarCartaoVirtual();
          } else {
            setTimeout(function() {
              if (window.inicializarCartaoVirtual) {
                window.inicializarCartaoVirtual();
              }
            }, 500);
          }
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosCartaoVirtual) {
            window.limparEventosCartaoVirtual();
          }
        },
      }
    },
    {
      path: '/metodos-verificacao/',
      url: 'metodos-verificacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/metodos-verificacao/').then(() => {
            console.log('[ROUTES.JS] Script de metodos-verificacao carregado');
            if (window.inicializarMetodos) {
              window.inicializarMetodos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de metodos-verificacao:', err);
          });
        },
        pageAfterIn: function (event, page) {
        // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        if (window.limparEventosMetodos) {
          window.limparEventosMetodos();
        }
        },
      }
    },
    {
      path: '/metodos-verificacao-liberacao-dispositivo/',
      url: 'metodos-verificacao-liberacao-dispositivo.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/metodos-verificacao-liberacao-dispositivo/').then(() => {
            console.log('[ROUTES.JS] Script de metodos-verificacao-liberacao-dispositivo carregado');
            if (window.inicializarMetodosVerificacaoLiberacaoDispositivo) {
              window.inicializarMetodosVerificacaoLiberacaoDispositivo();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de metodos-verificacao-liberacao-dispositivo:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosMetodosVerificacaoLiberacaoDispositivo) {
            window.limparEventosMetodosVerificacaoLiberacaoDispositivo();
          }
        }
      }
    },
    {
      path: '/validar-codigo-itoken/',
      url: 'validar-codigo-itoken.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/validar-codigo-itoken/').then(() => {
            console.log('[ROUTES.JS] Script de validar-codigo-itoken carregado');
            if (window.inicializarValidarCodigoItoken) {
              window.inicializarValidarCodigoItoken();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de validar-codigo-itoken:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosValidarCodigoItoken) {
            window.limparEventosValidarCodigoItoken();
          }
        }
      }
    },
    {
      path: '/tela-app-teste/indicacao-teste/',
      url: 'tela-app-teste/indicacao-teste.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          if (window.inicializarIndicacaoTeste) {
            window.inicializarIndicacaoTeste();
          }
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparIndicacaoTeste) {
            window.limparIndicacaoTeste();
          }
        }
      }
    },
    {
      path: '/tela-app-teste/teste-score-credito/',
      url: 'tela-app-teste/teste-score-credito.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          console.log('[routes.js] Página teste-score-credito inicializada');
        }
      }
    },
    {
      path: '/verificar-codigo-whatsapp/',
      url: 'verificar-codigo-whatsapp.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
        // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
        // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
        console.log('[routes.js] Página verificar-codigo-whatsapp inicializada');
        // Inicializar funcionalidades da verificação
        if (window.inicializarCodigoWhatsapp) {
          window.inicializarCodigoWhatsapp();
        } else {
          setTimeout(function() {
            if (window.inicializarCodigoWhatsapp) {
              window.inicializarCodigoWhatsapp();
            }
          }, 500);
        }
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        if (window.limparEventosCodigo) {
          window.limparEventosCodigo();
        }
        },
      }
    },
    {
      path: '/verificar-codigo-email/',
      url: 'verificar-codigo-email.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/verificar-codigo-email/').then(() => {
            console.log('[ROUTES.JS] Script de verificar-codigo-email carregado');
            if (window.inicializarPaginaVerificarCodigoEmail) {
              window.inicializarPaginaVerificarCodigoEmail();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de verificar-codigo-email:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosCodigo) {
            window.limparEventosCodigo();
          }
        }
      }
    },
    {
      path: '/alterar-senha/',
      url: 'alterar-senha.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/alterar-senha/').then(() => {
            console.log('[ROUTES.JS] Script de alterar-senha carregado');
            // Inicializar funcionalidades da alteração de senha
            if (window.inicializarPaginaAlterarSenha) {
              window.inicializarPaginaAlterarSenha();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /alterar-senha/:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Página já foi exibida
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          // limpar eventos se necessário
        },
      }
    },
    {
      path: '/termos/',
      url: 'termos.html',
      animate: true,
      transition: 'f7-cover-v',
      on: {
        pageBeforeIn: function (event, page) {
        // fazer algo antes da página ser exibida
        },
        pageAfterIn: function (event, page) {
        // fazer algo depois da página ser exibida
        },
        pageInit: function (event, page) {
        // fazer algo quando a página for inicializada
        console.log('[routes.js] Página termos inicializada');
        },
        pageBeforeRemove: function (event, page) {
        // fazer algo antes da página ser removida do DOM
        },
      }
    },
    {
      path: '/link2/',
      url: 'link2.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },
    {
      path: '/link3/',
      url: 'link3.html',
      animate: false,
	  on: {
		pageBeforeIn: function (event, page) {
		// fazer algo antes da página ser exibida
		},
		pageAfterIn: function (event, page) {
		// fazer algo depois da página ser exibida
		},
		pageInit: function (event, page) {
		// fazer algo quando a página for inicializada
		},
		pageBeforeRemove: function (event, page) {
		// fazer algo antes da página ser removida do DOM
		},
	  }
    },

    {
      path: '/cadastro-chat/',
      url: 'cadastro-chat.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/cadastro-chat/').then(() => {
            console.log('[ROUTES.JS] Script de cadastro-chat carregado');
            if (window.inicializarCadastroChat) {
              window.inicializarCadastroChat();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de cadastro-chat:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparCadastroChat) {
            window.limparCadastroChat();
          }
        }
      }
    },

    {
      path: '/cadastro-profissao/',
      url: 'cadastro-profissao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          console.log('[ROUTES.JS] Página cadastro-profissao inicializada');
          if (window.inicializarCadastroProfissao) {
            window.inicializarCadastroProfissao();
          } else {
            console.log('[ROUTES.JS] Função inicializarCadastroProfissao não encontrada');
          }
        }
      }
    },
    {
      path: '/indicacao-todos/',
      url: 'indicacao-todos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/indicacao-todos/').then(() => {
            console.log('[ROUTES.JS] Script de indicacao-todos carregado');
            // A função listarTodosIndicados é definida no IIFE do arquivo
            // Executar após um pequeno delay para garantir que o DOM esteja pronto
            setTimeout(() => {
              if (window.listarTodosIndicados) {
                window.listarTodosIndicados();
              }
            }, 100);
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /indicacao-todos/:', err);
          });
        },
        pageInit: function (event, page) {
          // Listeners configurados no pageBeforeIn após script carregar
        }
      }
    },
    {
      path: '/indicacao/',
      url: 'story-seletor.html',
      animate: true,
      transition: 'f7-cover-v',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/indicacao/').then(() => {
            if (window.inicializarIndicacao) {
              window.inicializarIndicacao();
            }
          });
        },
        pageAfterIn: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        },
        pageInit: function (event, page) {
          // Listeners configurados no pageBeforeIn após script carregar
        },
        pageBeforeRemove: function (event, page) {
          // fazer algo antes da página ser removida do DOM
          if (window.limparEventosIndicacao) {
            window.limparEventosIndicacao();
          }
        },
      }
    },


    {
      path: '/configuracoes-usuario/',
      url: 'configuracoes-usuario.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/configuracoes-usuario/').then(() => {
            console.log('[ROUTES.JS] Script de configuracoes-usuario carregado');
            // Chamar inicialização após script carregar
            if (window.inicializarConfiguracoesUsuario) {
              window.inicializarConfiguracoesUsuario();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de configuracoes-usuario:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/meus-dispositivos/',
      url: 'story-preview.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/meus-dispositivos/').then(() => {
            console.log('[ROUTES.JS] Script de meus-dispositivos carregado');
            // Chamar inicialização após script carregar
            if (window.inicializarMeusDispositivos) {
              window.inicializarMeusDispositivos();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de meus-dispositivos:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/dados-pessoais/',
      url: 'perfil/dados-pessoais.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function(event, page) {
          // Script já está carregado no index.html, chamar função direto
          console.log('[ROUTES.JS] Página dados-pessoais carregada');
          if (window.carregarDadosPessoais) {
            console.log('[ROUTES.JS] Chamando carregarDadosPessoais...');
            window.carregarDadosPessoais();
          }
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/dados-completos/',
      url: 'perfil/dados-completos.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Script já está carregado no index.html, chamar função direto
          console.log('[ROUTES.JS] Página dados-completos carregada');
          if (window.carregarDadosPessoais) {
            console.log('[ROUTES.JS] Chamando carregarDadosPessoais para dados-completos...');
            window.carregarDadosPessoais();
          }
        },
        pageInit: function (event, page) {
          // Inicializar dados completos quando a página for inicializada
          if (window.carregarDadosPessoais) {
            window.carregarDadosPessoais();
          } else {
            console.log('[routes.js] Função carregarDadosPessoais não encontrada');
          }
        }
      }
    },
    {
      path: '/editar-foto-perfil/',
      url: 'perfil/editar-foto-perfil.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          // Inicializar editar foto perfil quando a página for inicializada
          if (window.inicializarEditarFotoPerfil) {
            window.inicializarEditarFotoPerfil();
          } else {
            console.log('[routes.js] Função inicializarEditarFotoPerfil não encontrada');
          }
        }
      }
    },
      {
        path: '/suporte/',
        url: 'suporte.html',
        animate: true,
        transition: 'f7-push',
        on: {
          pageBeforeIn: function (event, page) {
            window.loadPageScripts('/suporte/').then(() => {
              console.log('[ROUTES.JS] Script de suporte carregado');
              if (window.carregarDadosSuporte) {
                window.carregarDadosSuporte();
              }
            }).catch(err => {
              console.error('[ROUTES.JS] Erro ao carregar script de suporte:', err);
            });
          },
          pageInit: function (event, page) {
            // Página já foi inicializada no pageBeforeIn
          }
        }
      },
      {
        path: '/frente-documento/',
        url: 'frente-documento.html',
        animate: true,
        transition: 'f7-push',
        on: {
          pageAfterIn: function (event, page) {
            // Script já carregado no index.html
            if (window.inicializarFrenteDocumento) {
              window.inicializarFrenteDocumento();
            }
          },
          pageBeforeRemove: function (event, page) {
            if (window.limparRecursosFrenteDocumento) {
              window.limparRecursosFrenteDocumento();
            }
          }
        }
      },
    {
      path: '/verso-documento/',
      url: 'verso-documento.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/verso-documento/').then(() => {
            console.log('[ROUTES.JS] Script de verso-documento carregado');
            if (window.inicializarVersoDocumento) {
              window.inicializarVersoDocumento();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de verso-documento:', err);
          });
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparRecursosVersoDocumento) {
            window.limparRecursosVersoDocumento();
          }
        }
      }
    },
    {
      path: '/analise-abertura-conta/',
      url: 'analise-abertura-conta.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/analise-abertura-conta/').then(() => {
            console.log('[ROUTES.JS] Script de analise-abertura-conta carregado');
            if (window.inicializarAnaliseAberturaConta) {
              window.inicializarAnaliseAberturaConta();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de analise-abertura-conta:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/chat/',
      url: 'chat.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          console.log('[ROUTES.JS] Chat pageBeforeIn');
          window.chatInitialized = false;
        },
        pageAfterIn: function (event, page) {
          console.log('[ROUTES.JS] Chat pageAfterIn');
          if (window.inicializarChatUsuarios) {
            window.inicializarChatUsuarios();
          }
        },
        pageBeforeRemove: function (event, page) {
          console.log('[ROUTES.JS] Chat pageBeforeRemove');
          // Limpar apenas o realtime, NÃO limpar conversaAtualId do sessionStorage
          if (window.limparChatUsuarios) {
            window.limparChatUsuarios();
          }
          window.chatInitialized = false;
        }
      }
    },

    {
      path: '/app-em-atualizacao/',
      url: 'app-em-atualizacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          console.log('[routes.js] Página app-em-atualizacao inicializada');
          if (window.inicializarAppEmAtualizacao) {
            window.inicializarAppEmAtualizacao();
          } else {
            console.log('[routes.js] Função inicializarAppEmAtualizacao não encontrada');
          }
        }
      }
    },


    {
      path: '/alterar-dados/',
      url: 'alterar-dados.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          // Inicializar funcionalidades da página alterar dados
          if (window.inicializarAlterarDados) {
            window.inicializarAlterarDados();
          } else {
            console.log('[routes.js] Função inicializarAlterarDados não encontrada');
          }
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos quando sair da página
          if (window.limparEventosAlterarDados) {
            window.limparEventosAlterarDados();
          }
        }
      }
    },
    {
      path: '/solicitar-senha-atual/',
      url: 'dados-pessoais/solicitar-senha-atual.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          if (window.inicializarSolicitarSenhaAtual) {
            window.inicializarSolicitarSenhaAtual();
          } else {
            console.log('[routes.js] Função inicializarSolicitarSenhaAtual não encontrada');
          }
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosSolicitarSenhaAtual) {
            window.limparEventosSolicitarSenhaAtual();
          }
        }
      }
    },
    {
      path: '/senha-alterada/',
      url: 'senha-alterada.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          if (window.inicializarSenhaAlterada) {
            window.inicializarSenhaAlterada();
          }
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosSenhaAlterada) {
            window.limparEventosSenhaAlterada();
          }
        }
      }
    },
    {
      path: '/extrato/',
      url: 'extrato.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function(event, page) {
          window.loadPageScripts('/extrato/').then(async () => {
            console.log('[ROUTES.JS] Script de extrato carregado');
            if (window.setupExtratoRealtimeListeners) {
              window.setupExtratoRealtimeListeners();
            }
            // Carregar as transações assim que o script está pronto
            if (window.buscarTransacoesExtrato && window.atualizarInterfaceExtrato) {
              console.log('[ROUTES.JS] Carregando transações do extrato...');
              try {
                const transacoes = await window.buscarTransacoesExtrato();
                window.atualizarInterfaceExtrato(transacoes);
              } catch (err) {
                console.error('[ROUTES.JS] Erro ao carregar transações:', err);
              }
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /extrato/:', err);
          });
        },
        pageInit: function (event, page) {
          // Listeners configurados no pageBeforeIn após script carregar
        }
      }
    },
    {
      path: '/detalhes-dados-para-pagamento-fatura/',
      url: 'detalhes-dados-para-pagamento-fatura.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/detalhes-dados-para-pagamento-fatura/').then(async () => {
            // Inicializar funcionalidades da página detalhes dados
            if (window.inicializarDetalhesDadosPagamentoFatura) {
              console.log('[ROUTES.JS] Inicializando detalhes-dados-para-pagamento-fatura');
              window.inicializarDetalhesDadosPagamentoFatura();
            } else {
              console.error('[ROUTES.JS] Função inicializarDetalhesDadosPagamentoFatura não encontrada');
            }
          }).catch(error => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /detalhes-dados-para-pagamento-fatura/:', error);
          });
        },
        pageAfterIn: function (event, page) {
          // Executado quando a página volta a ficar ativa (ex: back button)
          console.log('[ROUTES.JS] Página detalhes-dados-para-pagamento-fatura voltou a ficar ativa');

          // Re-executar apenas a validação do clube (não toda a inicialização)
          if (window.atualizarValidacaoClube) {
            console.log('[ROUTES.JS] Atualizando validação do clube após voltar à página');
            window.atualizarValidacaoClube();
          }
        }
      }
    },
    {
      path: '/conversas-usuarios/',
      url: 'conversas-usuarios.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          window.loadPageScripts('/conversas-usuarios/').then(() => {
            console.log('[ROUTES.JS] Script de conversas-usuarios carregado');
            if (window.inicializarConversasUsuarios) {
              window.inicializarConversasUsuarios();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de conversas-usuarios:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Registrar listener de realtime após página visível — padrão do projeto
          if (window._convRealtimeHandler) {
            window.removeEventListener('tasktimeMensagensUpdated', window._convRealtimeHandler);
          }
          window._convRealtimeHandler = function() {
            if (window._convRecarregarConversas) window._convRecarregarConversas();
          };
          window.addEventListener('tasktimeMensagensUpdated', window._convRealtimeHandler);
          console.log('[ROUTES.JS] Listener realtime conversas registrado');
        },
        pageBeforeRemove: function (event, page) {
          if (window.limparEventosConversasUsuarios) {
            window.limparEventosConversasUsuarios();
          }
          if (window._convRealtimeHandler) {
            window.removeEventListener('tasktimeMensagensUpdated', window._convRealtimeHandler);
            window._convRealtimeHandler = null;
          }
        }
      }
    },
    {
      path: '/notificacoes/',
      url: 'notificacoes.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function(event, page) {
          window.loadPageScripts('/notificacoes/').then(() => {
            console.log('[ROUTES.JS] Script de notificações carregado');
            // Carregar notificações quando o script estiver pronto
            if (typeof carregarNotificacoes === 'function') {
              carregarNotificacoes();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /notificacoes/:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/pix-recebido/',
      url: 'pix-recebido.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/pix-recebido/').then(() => {
            console.log('[ROUTES.JS] Script de PIX recebido carregado');
            // Chamar inicialização após script carregar
            if (window.inicializarPixRecebido) {
              window.inicializarPixRecebido();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de PIX recebido:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/devolver-pix/',
      url: 'devolver-pix.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar script da página antes de exibir
          window.loadPageScripts('/devolver-pix/').then(() => {
            console.log('[ROUTES.JS] Script de devolver PIX carregado');
            // Chamar inicialização após script carregar
            if (window.inicializarDevolverPix) {
              window.inicializarDevolverPix();
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de devolver PIX:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/ligacao/',
      url: 'ligacao.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Setar nome e avatar imediatamente — sem iniciar timer ainda
          var nomeCompleto = localStorage.getItem('ligacaoNomeContato') || '';
          var nome = nomeCompleto.trim().split(' ')[0] || '';
          var foto = localStorage.getItem('ligacaoFotoContato') || '';
          var nomeEl   = page.el.querySelector('#ligacaoNome');
          var avatarEl = page.el.querySelector('#ligacaoAvatar');
          if (nomeEl) nomeEl.textContent = nome;
          if (avatarEl) {
            if (foto) {
              avatarEl.style.backgroundColor = 'transparent';
              avatarEl.style.overflow = 'hidden';
              avatarEl.innerHTML = '<img src="' + foto + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">';
            } else {
              avatarEl.textContent = nome.substring(0,2).toUpperCase();
              avatarEl.style.backgroundColor = 'rgba(255,255,255,0.18)';
              avatarEl.style.color = '#fff';
            }
          }
          // Pré-carregar script
          window.loadPageScripts('/ligacao/').catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de ligação:', err);
          });
        },
        pageAfterIn: function (event, page) {
          // Garantir que o script está carregado antes de inicializar
          window.loadPageScripts('/ligacao/').then(function() {
            if (window.inicializarLigacao) {
              window.inicializarLigacao(page.el);
            }
          });
        },
        pageBeforeRemove: function (event, page) {
          if (window.encerrarTimerLigacao) {
            window.encerrarTimerLigacao();
          }
        },
        pageInit: function (event, page) {}
      }
    },
    {
      path: '/beneficios/',
      url: 'beneficios.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/beneficios/').then(() => {
            console.log('[ROUTES.JS] Script de beneficios carregado');
            // Inicializar funcionalidades da página benefícios
            if (window.inicializarBeneficios) {
              window.inicializarBeneficios();
            } else {
              console.error('[ROUTES.JS] Função inicializarBeneficios não encontrada');
            }
          }).catch(err => {
            console.error('[ROUTES.JS] Erro ao carregar script de beneficios:', err);
          });
        },
        pageInit: function (event, page) {
          // Página já foi inicializada no pageBeforeIn
        }
      }
    },
    {
      path: '/pagar-fatura/',
      url: 'pagar-fatura.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/pagar-fatura/').then(async () => {
            // Inicializar funcionalidades da página pagar fatura
            if (window.inicializarPagarFatura) {
              window.inicializarPagarFatura();
            }
          }).catch(error => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /pagar-fatura/:', error);
          });
        }
      }
    },
    {
      path: '/pix-pagamento-fatura/',
      url: 'pix-pagamento-fatura.html',
      animate: true,
      transition: 'f7-dive',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/pix-pagamento-fatura/').then(async () => {
            // Inicializar funcionalidades da página de pagamento de fatura com PIX
            if (window.inicializarPixPagamentoFatura) {
              window.inicializarPixPagamentoFatura();
            } else {
              console.error('[ROUTES.JS] Função inicializarPixPagamentoFatura não encontrada');
            }
          }).catch(error => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /pix-pagamento-fatura/:', error);
          });
        }
      }
    },
    {
      path: '/boleto/',
      url: 'boleto.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/boleto/').then(async () => {
            // Inicializar funcionalidades da página boleto
            if (window.inicializarBoleto) {
              window.inicializarBoleto();
            } else {
              console.error('[ROUTES.JS] Função inicializarBoleto não encontrada');
            }
          }).catch(error => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /boleto/:', error);
          });
        }
      }
    },
    {
      path: '/pagamento-aprovado-fatura/',
      url: 'pagamento-aprovado-fatura.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageBeforeIn: function (event, page) {
          // Carregar e inicializar scripts da página
          window.loadPageScripts('/pagamento-aprovado-fatura/').then(async () => {
            // Inicializar funcionalidades da página pagamento aprovado
            if (window.inicializarPagamentoAprovado) {
              window.inicializarPagamentoAprovado();
            } else {
              console.error('[ROUTES.JS] Função inicializarPagamentoAprovado não encontrada');
            }
          }).catch(error => {
            console.error('[ROUTES.JS] Erro ao carregar scripts de /pagamento-aprovado-fatura/:', error);
          });
        },
        pageBeforeRemove: function (event, page) {
          // Limpar eventos da página pagamento aprovado
          if (window.limparEventosPagamentoAprovado) {
            window.limparEventosPagamentoAprovado();
          }
        }
      }
    },

    {
      path: '/pedir-convite/',
      url: 'pedir-convite.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
        }
      }
    },
    {
      path: '/pedido-realizado/',
      url: 'pedido-realizado.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          // Chamar função de inicialização da página
          if (window.inicializarPedidoRealizado) {
            window.inicializarPedidoRealizado();
          }
        }
      }
    },
    {
      path: '/solicitacao-em-analise/',
      url: 'solicitacao-em-analise.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
        }
      }
    },
    {
      path: '/solicitacao-reprovada/',
      url: 'solicitacao-reprovada.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
        }
      }
    },
    {
      path: '/solicitacao-pre-aprovada/',
      url: 'solicitacao-pre-aprovada.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
        }
      }
    },
    {
      path: '/usuario-esta-na-lista/',
      url: 'usuario-esta-na-lista.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
        }
      }
    },
    {
      path: '/etapas-cadastro/',
      url: 'etapas-cadastro.html',
      animate: true,
      transition: 'f7-push',
      on: {
        pageInit: function (event, page) {
          // Inicializar funcionalidades da página de etapas
          if (window.inicializarEtapasCadastro) {
            window.inicializarEtapasCadastro();
          } else {
            setTimeout(function() {
              if (window.inicializarEtapasCadastro) {
                window.inicializarEtapasCadastro();
              }
            }, 500);
          }
        }
      }
    },
    // Rota da página sem conexão removida - não será mais usada
  ],
  // ... other parameters
});
window.app = app;

// Garantir que a view principal seja criada corretamente
function criarViewPrincipal() {
  if (!app.views.main) {
    app.views.create('.view-main', { url: '/splash/' });
  }
}

// Tentar criar a view em diferentes momentos
document.addEventListener('DOMContentLoaded', criarViewPrincipal);
setTimeout(criarViewPrincipal, 100);
setTimeout(criarViewPrincipal, 500);

// Garantir que a navegação funcione corretamente
window.navegarParaTermos = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/termos/', { transition: 'f7-push' });
  } else {
    window.location.href = 'termos.html';
  }
};

window.navegarParaLogin = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/login/', { transition: 'f7-push' });
  } else {
    window.location.href = 'login.html';
  }
};

window.navegarParaPedirConvite = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/cadastro-chat/', { transition: 'f7-push' });
  } else {
    window.location.href = 'cadastro-chat.html';
  }
};


window.navegarParaPedidoRealizado = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/pedido-realizado/', { transition: 'f7-push' });
  } else {
    window.location.href = 'pedido-realizado.html';
  }
};

window.navegarParaSolicitacaoEmAnalise = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/solicitacao-em-analise/', { transition: 'f7-push' });
  } else {
    window.location.href = 'solicitacao-em-analise.html';
  }
};

window.navegarParaSolicitacaoReprovada = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/solicitacao-reprovada/', { transition: 'f7-push' });
  } else {
    window.location.href = 'solicitacao-reprovada.html';
  }
};

window.navegarParaSolicitacaoPreAprovada = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/solicitacao-pre-aprovada/', { transition: 'f7-push' });
  } else {
    window.location.href = 'solicitacao-pre-aprovada.html';
  }
};

window.navegarParaTaxas = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/taxas-usuario/', { transition: 'f7-push' });
  } else {
    window.location.href = 'taxas-usuario.html';
  }
};

window.navegarParaUsuarioEstaNaLista = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/usuario-esta-na-lista/', { transition: 'f7-push' });
  } else {
    window.location.href = 'usuario-esta-na-lista.html';
  }
};

window.navegarParaEtapasCadastro = function() {
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/etapas-cadastro/', { transition: 'f7-push' });
  } else {
    window.location.href = 'etapas-cadastro.html';
  }
};

// Função global para ir para etapas do cadastro (usada no botão)
window.irParaEtapasCadastro = function() {
  if (window.navegarParaEtapasCadastro) {
    window.navegarParaEtapasCadastro();
  } else {

// Função global para navegar para detalhes do parcelamento
window.navegarParaDetalhesParcelamento = function(parcelamentoId, transferenciaId) {
  
  // Armazenar IDs na sessão para a próxima página
  sessionStorage.setItem('parcelamentoId', parcelamentoId);
  sessionStorage.setItem('transferenciaId', transferenciaId);
  
  if (app && app.views && app.views.main && app.views.main.router) {
    app.views.main.router.navigate('/detalhes-parcelamento/', { transition: 'f7-push' });
  } else {
    window.location.href = 'detalhes-parcelamento.html';
  }
};

    console.log('[ROUTES.JS] Função navegarParaEtapasCadastro não encontrada, usando fallback...');
    if (app && app.views && app.views.main && app.views.main.router) {
      app.views.main.router.navigate('/etapas-cadastro/', { transition: 'f7-push' });
    } else {
      window.location.href = 'etapas-cadastro.html';
    }
  }
};

// Função para verificar se deve mostrar o seletor de crédito

app.on('routeChange', async function (route) {
  var currentRoute = route.url;
  
  // Mostrar/ocultar selector conta/cartões baseado na rota
  var selectorContaCartoes = document.getElementById('selectorContaCartoes');
  
  if (selectorContaCartoes) {
    if (currentRoute.includes('/cartoes/')) {
      // As abas são gerenciadas pelo Framework7 automaticamente
      // Não precisa mais de código customizado para gerenciar abas
    } else if (currentRoute.includes('/home/')) {
      // As abas da página home são gerenciadas pelo Framework7 automaticamente
      // Não precisa mais de código customizado para gerenciar abas
    }
  }
  
  // Atualizar estado ativo das abas
  document.querySelectorAll('.tab-link').forEach(function (el) {
    el.classList.remove('active');
  });
  var targetEl = document.querySelector('.tab-link[href="' + currentRoute + '"]');
  if (targetEl) {
    targetEl.classList.add('active');
  }
});



function onDeviceReadyRoutes() {
  
  // Marcar Cordova como pronto
  window.cordovaReady = true;
  
  
  // Aguardar um pouco para garantir que todos os plugins foram carregados
  setTimeout(() => {
    
    if (typeof window.cordova === 'undefined') {
      console.log('[ROUTES.JS] ERRO: window.cordova não está definido');

    } else {
      
      
      if (!window.cordova.plugins) {
        console.log('[ROUTES.JS] ERRO: window.cordova.plugins não existe');

      } else {
        
        
        if (!window.cordova.plugins.socialsharing) {
          console.log('[ROUTES.JS] ERRO: Plugin socialsharing não está instalado');

          
          // Tentar outras variações do nome do plugin
          console.log('[ROUTES.JS] Tentando outras variações...');
          console.log('[ROUTES.JS] Plugins disponíveis:', Object.keys(window.cordova.plugins));

          
          // Verificar se há algum plugin de compartilhamento alternativo
          const pluginsDisponiveis = Object.keys(window.cordova.plugins);
          const pluginsCompartilhamento = pluginsDisponiveis.filter(plugin => 
            plugin.toLowerCase().includes('share') || 
            plugin.toLowerCase().includes('social') ||
            plugin.toLowerCase().includes('clipboard')
          );
          
          if (pluginsCompartilhamento.length > 0) {
            console.log('[ROUTES.JS] Plugins de compartilhamento encontrados:', pluginsCompartilhamento);

          } else {
            console.log('[ROUTES.JS] Nenhum plugin de compartilhamento encontrado');

          }
          
          // Verificar se o plugin está disponível como window.plugins.socialsharing (forma correta)
          if (window.plugins && window.plugins.socialsharing) {
            console.log('[ROUTES.JS] Plugin encontrado como window.plugins.socialsharing');
          } else if (window.cordova.plugins.SocialSharing) {
            console.log('[ROUTES.JS] Plugin encontrado como SocialSharing');
          } else if (window.cordova.plugins.xSocialSharing) {
            console.log('[ROUTES.JS] Plugin encontrado como xSocialSharing');
          } else if (window.cordova.plugins.socialsharing) {
            console.log('[ROUTES.JS] Plugin encontrado como socialsharing (minúsculo)');
          } else if (window.cordova.plugins.XSocialSharing) {
            console.log('[ROUTES.JS] Plugin encontrado como XSocialSharing');
          } else if (window.cordova.plugins['cordova-plugin-x-socialsharing']) {
            console.log('[ROUTES.JS] Plugin encontrado como cordova-plugin-x-socialsharing');
          } else {
            console.log('[ROUTES.JS] Plugin não encontrado em nenhuma variação');
          }
        } else {
          console.log('[ROUTES.JS] Plugin socialsharing está instalado');
        }
      }
    }
  }, 1000); // Aguardar 1 segundo
  
  //Quando estiver rodando no celular
  try {
    var mainView = app.views.create('.view-main');
    
            // Configuração da status bar será feita pelos arquivos do app
    
  } catch (error) {
    console.error('[ROUTES.JS] Erro ao inicializar Framework7 view:', error);
  }
}

// Funções globais para gerenciar conectividade foram removidas
// As abas da página home agora são gerenciadas pelo Framework7 automaticamente
// O código abaixo foi removido pois não é mais necessário

// Inicializar componentes globais do Framework7
window.messagesInstance = null;
window.messagebarInstance = null;

// Função para inicializar componentes do Framework7 quando necessário
window.inicializarComponentesFramework7Global = function() {
  console.log('[ROUTES.JS] Inicializando componentes Framework7 globais...');

  // Aguardar Framework7 estar pronto
  if (!window.app) {
    console.error('[ROUTES.JS] Framework7 app não disponível');
    return;
  }

  // Inicializar Messages se o elemento existir
  const chatMessagesEl = document.getElementById('chatMessages');
  if (chatMessagesEl && !window.messagesInstance) {
    try {
      window.messagesInstance = app.messages.create({
        el: '#chatMessages',
        autoLayout: true,
        scrollMessages: true,
        scrollMessagesOnEdge: true
      });
      console.log('[ROUTES.JS] Messages instance criado com sucesso');
    } catch (error) {
      console.error('[ROUTES.JS] Erro ao criar messages instance:', error);
    }
  }

  // Inicializar Messagebar se o elemento existir
  const messagebarEl = document.getElementById('messagebar');
  if (messagebarEl && !window.messagebarInstance) {
    try {
      window.messagebarInstance = app.messagebar.create({
        el: '#messagebar',
        textareaEl: '.messagebar-textarea',
        maxHeight: 100
      });
      console.log('[ROUTES.JS] Messagebar instance criado com sucesso');
    } catch (error) {
      console.error('[ROUTES.JS] Erro ao criar messagebar instance:', error);
    }
  }
};

// Expor app globalmente
window.app = app;

// Funções da barra de progresso removidas

// Interceptar cliques em links ANTES do Framework7 processar
document.addEventListener('click', function(e) {
  const link = e.target.closest('a[href]');
  if (link && link.href) {
    const href = link.getAttribute('href');
    // Verificar se é link interno do Framework7
    if (href && !href.startsWith('#') && !href.startsWith('javascript:') &&
        !href.startsWith('http://') && !href.startsWith('https://') &&
        !link.hasAttribute('target')) {
      console.log('[ROUTES.JS] Clique em link detectado:', href);
      // Progress bar removida
    }
  }
}, true); // Usar capture phase para interceptar ANTES

// Interceptar router.navigate quando disponível
function configurarInterceptacaoRouter() {
  if (app && app.views && app.views.main && app.views.main.router) {
    const router = app.views.main.router;
    const originalNavigate = router.navigate;
    
    router.navigate = function(url, options) {
      console.log('[ROUTES.JS] router.navigate interceptado:', url);
      // Progress bar removida
      return originalNavigate.call(this, url, options);
    };
    
    console.log('[ROUTES.JS] Interceptação do router configurada');
  } else {
    setTimeout(configurarInterceptacaoRouter, 500);
  }
}

// Configurar eventos globais de página do Framework7 para finalizar barra
console.log('[ROUTES.JS] Configurando eventos globais de página para barra de progresso...');
console.log('[ROUTES.JS] app existe:', !!app);

if (app) {
  setTimeout(configurarInterceptacaoRouter, 100);
  
  app.on('pageAfterIn', function (page) {
    if (page.name === 'splash' || page.name === 'index') {
      return;
    }
    
    setTimeout(() => {
      // Progress bar removida
    }, 300);
  });
}

// Funções do overlay global expostas em overlay-global.js



// Listener para quando a página de cartões for carregada
document.addEventListener('page:mounted', function(e) {
    if (e.target.getAttribute('data-name') === 'cartoes') {
    }
});

// Listeners para detectar mudanças de conexão
window.addEventListener('online', function() {
});

window.addEventListener('offline', function() {
});

// Listeners do overlay global movidos para overlay-global.js



// Overlay global movido para overlay-global.js





// Configuração simples de duplo clique no botão voltar para encerrar app na home
let backButtonClickCount = 0;
let backButtonClickTimer = null;

document.addEventListener('backbutton', function(e) {
  // Só funcionar na página home
  if (app.views.main.router.currentRoute.path === '/home/') {
    e.preventDefault();
    e.stopPropagation();
    
    backButtonClickCount++;
    
    if (backButtonClickCount === 1) {
      // Primeiro clique
      if (backButtonClickTimer) clearTimeout(backButtonClickTimer);
      backButtonClickTimer = setTimeout(function() {
        backButtonClickCount = 0;
      }, 2000);
      
      // Mostrar mensagem
      if (app.toast) {
        app.toast.create({
          text: 'Pressione novamente para sair',
          position: 'center',
          closeTimeout: 2000
        }).open();
      }
      
    } else if (backButtonClickCount === 2) {
      // Segundo clique - encerrar app
      console.log('[routes.js] Duplo clique - encerrando app');
      if (backButtonClickTimer) clearTimeout(backButtonClickTimer);
      
      // Limpar dados e encerrar
      localStorage.removeItem('sessaoAtual');
      localStorage.removeItem('tempoSessao');
      
      if (navigator.app && navigator.app.exitApp) {
        navigator.app.exitApp();
      } else if (navigator.device && navigator.device.exitApp) {
        navigator.device.exitApp();
      }
    }
  }
}, false);

