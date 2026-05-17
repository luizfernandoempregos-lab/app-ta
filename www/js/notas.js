// ==================== NOTAS - LocalStorage CRUD ====================

var _notasKey = 'app_notas_data';
var _notasFiltroAtual = 'todas';

// Gera ID único
function notasGerarId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Formata data para exibição
function notasFmtData(ts) {
    var d = new Date(ts);
    var dia = String(d.getDate()).padStart(2, '0');
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var ano = d.getFullYear();
    var hora = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return dia + '/' + mes + '/' + ano + ' às ' + hora + ':' + min;
}

// Busca todas as notas do localStorage
function notasObterTodas() {
    try {
        var dados = localStorage.getItem(_notasKey);
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        return [];
    }
}

// Salva todas as notas no localStorage
function notasSalvarTodas(notas) {
    localStorage.setItem(_notasKey, JSON.stringify(notas));
}

// Atualiza os contadores no header
function notasAtualizarStats() {
    var notas = notasObterTodas();
    var total = notas.length;
    var fixadas = notas.filter(function(n) { return n.fixada; }).length;
    var lembretes = notas.filter(function(n) { return n.lembrete; }).length;

    var elTotal = document.getElementById('totalNotas');
    var elFixadas = document.getElementById('notasFixadas');
    var elLembretes = document.getElementById('notasLembretes');

    if (elTotal) elTotal.textContent = total;
    if (elFixadas) elFixadas.textContent = fixadas;
    if (elLembretes) elLembretes.textContent = lembretes;
}

// Renderiza a lista de notas
function notasRenderizar() {
    var notas = notasObterTodas();
    var lista = document.getElementById('notasLista');
    var vazio = document.getElementById('notasVazio');
    if (!lista) return;

    // Aplicar filtro
    var filtradas = notas;
    if (_notasFiltroAtual === 'fixadas') {
        filtradas = notas.filter(function(n) { return n.fixada; });
    } else if (_notasFiltroAtual === 'lembretes') {
        filtradas = notas.filter(function(n) { return n.lembrete; });
    }

    // Aplicar busca
    var searchInput = document.getElementById('notasSearchInput');
    if (searchInput && searchInput.value.trim()) {
        var termo = searchInput.value.trim().toLowerCase();
        filtradas = filtradas.filter(function(n) {
            return (n.titulo && n.titulo.toLowerCase().indexOf(termo) !== -1) ||
                   (n.conteudo && n.conteudo.toLowerCase().indexOf(termo) !== -1);
        });
    }

    // Ordenar: fixadas primeiro, depois por data (mais recente)
    filtradas.sort(function(a, b) {
        if (a.fixada && !b.fixada) return -1;
        if (!a.fixada && b.fixada) return 1;
        return (b.criadoEm || 0) - (a.criadoEm || 0);
    });

    if (filtradas.length === 0) {
        lista.innerHTML = '';
        if (vazio) vazio.classList.remove('notas-hidden');
        return;
    }

    if (vazio) vazio.classList.add('notas-hidden');

    var html = '';
    filtradas.forEach(function(nota) {
        var cor = nota.cor || '#ffffff';
        var borderCor = cor === '#ffffff' ? 'var(--app-primary-color, #1e40af)' : nota.cor;

        html += '<div class="nota-card" style="background:' + cor + '; border-left-color:' + borderCor + ';" onclick="notasAbrirNota(\'' + nota.id + '\')">';
        html += '  <div class="nota-card-header">';
        html += '    <div class="nota-card-titulo">' + notasEscapeHtml(nota.titulo || 'Sem título') + '</div>';
        html += '    <div class="nota-card-acoes">';
        html += '        <button class="nota-card-acao" onclick="event.stopPropagation(); notasEditar(\'' + nota.id + '\')" title="Editar">';
          html += '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>';
          html += '      </button>';
          html += '      <button class="nota-card-acao deletar" onclick="event.stopPropagation(); notasDeletar(\'' + nota.id + '\')" title="Excluir">';
        html += '        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>';
        html += '      </button>';
        html += '    </div>';
        html += '  </div>';

        if (nota.conteudo) {
            html += '  <div class="nota-card-conteudo">' + notasEscapeHtml(nota.conteudo) + '</div>';
        }

        html += '  <div class="nota-card-footer">';
        html += '    <span class="nota-card-data">' + notasFmtData(nota.criadoEm) + '</span>';

        if (nota.fixada) {
            html += '    <span class="nota-badge nota-badge-fixada">';
            html += '      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>';
            html += '      Fixada';
            html += '    </span>';
        }

        if (nota.lembrete) {
            var lembreteTexto = 'Lembrete';
            if (nota.lembreteData) {
                lembreteTexto = notasFmtData(new Date(nota.lembreteData).getTime());
            }
            html += '    <span class="nota-badge nota-badge-lembrete">';
            html += '      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 6v6l4 2"/></svg>';
            html += '      ' + lembreteTexto;
            html += '    </span>';
        }

        html += '  </div>';
        html += '</div>';
    });

    lista.innerHTML = html;
    notasAtualizarStats();
}

// Escape HTML
function notasEscapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/\n/g, '<br>');
}

// Abre o modal para criar nova nota
function notasAbrirModal() {
    document.getElementById('notaEditId').value = '';
    document.getElementById('notaTitulo').value = '';
    document.getElementById('notaConteudo').value = '';
    document.getElementById('notaFixada').checked = false;
    document.getElementById('notaLembrete').checked = false;
    document.getElementById('notaLembreteData').value = '';
    document.getElementById('notaLembreteDataWrapper').classList.add('notas-hidden');
    document.getElementById('notasModalTitulo').textContent = 'Nova Nota';

    // Reset cor
    var corBtns = document.querySelectorAll('.notas-cor-btn');
    corBtns.forEach(function(btn) { btn.classList.remove('active'); });
    if (corBtns[0]) corBtns[0].classList.add('active');

    document.getElementById('notasModal').classList.remove('notas-hidden');
}

// Fecha o modal
function notasFecharModal() {
    document.getElementById('notasModal').classList.add('notas-hidden');
}

// Seleciona cor
function notasSelecionarCor(el) {
    document.querySelectorAll('.notas-cor-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    el.classList.add('active');
}

// Toggle lembrete data
function notasToggleLembrete() {
    var checked = document.getElementById('notaLembrete').checked;
    if (checked) {
        document.getElementById('notaLembreteDataWrapper').classList.remove('notas-hidden');
    } else {
        document.getElementById('notaLembreteDataWrapper').classList.add('notas-hidden');
    }
}

// Salvar nota (criar ou editar)
function notasSalvar() {
    var titulo = document.getElementById('notaTitulo').value.trim();
    var conteudo = document.getElementById('notaConteudo').value.trim();

    if (!titulo && !conteudo) {
        if (typeof app !== 'undefined' && app.dialog) {
            app.dialog.alert('Preencha pelo menos o título ou conteúdo.');
        } else {
            alert('Preencha pelo menos o título ou conteúdo.');
        }
        return;
    }

    var corAtiva = document.querySelector('.notas-cor-btn.active');
    var cor = corAtiva ? corAtiva.getAttribute('data-cor') : '#ffffff';
    var fixada = document.getElementById('notaFixada').checked;
    var lembrete = document.getElementById('notaLembrete').checked;
    var lembreteData = document.getElementById('notaLembreteData').value || '';

    var editId = document.getElementById('notaEditId').value;
    var notas = notasObterTodas();

    if (editId) {
        // Editar existente
        notas = notas.map(function(n) {
            if (n.id === editId) {
                n.titulo = titulo;
                n.conteudo = conteudo;
                n.cor = cor;
                n.fixada = fixada;
                n.lembrete = lembrete;
                n.lembreteData = lembreteData;
                n.editadoEm = Date.now();
            }
            return n;
        });
    } else {
        // Criar nova
        notas.push({
            id: notasGerarId(),
            titulo: titulo,
            conteudo: conteudo,
            cor: cor,
            fixada: fixada,
            lembrete: lembrete,
            lembreteData: lembreteData,
            criadoEm: Date.now(),
            editadoEm: null
        });
    }

    notasSalvarTodas(notas);
    notasFecharModal();
    notasRenderizar();
}

// Editar nota
function notasEditar(id) {
    var notas = notasObterTodas();
    var nota = notas.find(function(n) { return n.id === id; });
    if (!nota) return;

    document.getElementById('notaEditId').value = nota.id;
    document.getElementById('notaTitulo').value = nota.titulo || '';
    document.getElementById('notaConteudo').value = (nota.conteudo || '').replace(/<br>/g, '\n');
    document.getElementById('notaFixada').checked = !!nota.fixada;
    document.getElementById('notaLembrete').checked = !!nota.lembrete;
    document.getElementById('notaLembreteData').value = nota.lembreteData || '';
    if (nota.lembrete) {
        document.getElementById('notaLembreteDataWrapper').classList.remove('notas-hidden');
    } else {
        document.getElementById('notaLembreteDataWrapper').classList.add('notas-hidden');
    }
    document.getElementById('notasModalTitulo').textContent = 'Editar Nota';

    // Selecionar cor
    var corBtns = document.querySelectorAll('.notas-cor-btn');
    corBtns.forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-cor') === (nota.cor || '#ffffff')) {
            btn.classList.add('active');
        }
    });

    document.getElementById('notasModal').classList.remove('notas-hidden');
}

// Deletar nota
function notasDeletar(id) {
    var confirmar = function() {
        var notas = notasObterTodas();
        notas = notas.filter(function(n) { return n.id !== id; });
        notasSalvarTodas(notas);
        notasRenderizar();
    };

    if (typeof app !== 'undefined' && app.dialog) {
        app.dialog.confirm('Deseja excluir esta nota?', 'Excluir', confirmar);
    } else {
        if (confirm('Deseja excluir esta nota?')) {
            confirmar();
        }
    }
}

// Abrir nota na pagina de visualizacao
function notasAbrirNota(id) {
    if (typeof app !== 'undefined' && app.views && app.views.main) {
        app.views.main.router.navigate('/ver-nota.html?id=' + id);
    } else {
        window.location.href = 'ver-nota.html?id=' + id;
    }
}

// Filtrar notas
function notasFiltrar(filtro) {
    _notasFiltroAtual = filtro;
    document.querySelectorAll('.notas-filtro-btn').forEach(function(btn) {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filtro') === filtro) {
            btn.classList.add('active');
        }
    });
    notasRenderizar();
}

// Inicializar página
function inicializarNotas() {
    notasRenderizar();
    notasAtualizarStats();

    // Busca em tempo real
    var searchInput = document.getElementById('notasSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            notasRenderizar();
        });
    }
}

// Inicializar quando página carregar
window.inicializarNotas = inicializarNotas;

// Auto-inicializar se a página já está carregada
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(inicializarNotas, 200);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(inicializarNotas, 200);
    });
}
