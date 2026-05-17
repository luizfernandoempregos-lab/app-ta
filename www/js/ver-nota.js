// ==================== VER NOTA - Visualizar/Editar nota ====================

var _verNotaId = null;
var _verNotaEditando = false;

// Obtem o ID da nota da URL (?id=xxx)
function verNotaObterIdUrl() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// Busca todas as notas do localStorage
function verNotaObterTodas() {
    try {
        var dados = localStorage.getItem('app_notas_data');
        return dados ? JSON.parse(dados) : [];
    } catch (e) {
        return [];
    }
}

// Salva todas as notas no localStorage
function verNotaSalvarTodas(notas) {
    localStorage.setItem('app_notas_data', JSON.stringify(notas));
}

// Busca uma nota por ID
function verNotaObterPorId(id) {
    var notas = verNotaObterTodas();
    return notas.find(function(n) { return n.id === id; }) || null;
}

// Formata data
function verNotaFmtData(ts) {
    var d = new Date(ts);
    var dia = String(d.getDate()).padStart(2, '0');
    var mes = String(d.getMonth() + 1).padStart(2, '0');
    var ano = d.getFullYear();
    var hora = String(d.getHours()).padStart(2, '0');
    var min = String(d.getMinutes()).padStart(2, '0');
    return dia + '/' + mes + '/' + ano + ' as ' + hora + ':' + min;
}

// Carrega a nota na pagina
function verNotaCarregar() {
    _verNotaId = verNotaObterIdUrl();
    if (!_verNotaId) {
        verNotaVoltar();
        return;
    }

    var nota = verNotaObterPorId(_verNotaId);
    if (!nota) {
        verNotaVoltar();
        return;
    }

    // Preencher campos
    var tituloEl = document.getElementById('verNotaTitulo');
    var conteudoEl = document.getElementById('verNotaConteudo');
    var headerTitulo = document.getElementById('verNotaHeaderTitulo');
    var infoEl = document.getElementById('verNotaInfo');

    if (tituloEl) tituloEl.value = nota.titulo || '';
    if (conteudoEl) {
        conteudoEl.value = (nota.conteudo || '').replace(/<br>/g, '\n');
        verNotaAutoResize(conteudoEl);
    }
    if (headerTitulo) headerTitulo.textContent = nota.titulo || 'Nota';

    // Info
    if (infoEl) {
        var infoHtml = '';
        infoHtml += '<span>Criada em ' + verNotaFmtData(nota.criadoEm) + '</span>';
        if (nota.editadoEm) {
            infoHtml += '<span>Editada em ' + verNotaFmtData(nota.editadoEm) + '</span>';
        }
        if (nota.fixada) {
            infoHtml += '<span class="ver-nota-info-badge ver-nota-badge-fixada">Fixada</span>';
        }
        if (nota.lembrete) {
            var lembreteTexto = 'Lembrete';
            if (nota.lembreteData) {
                lembreteTexto = verNotaFmtData(new Date(nota.lembreteData).getTime());
            }
            infoHtml += '<span class="ver-nota-info-badge ver-nota-badge-lembrete">' + lembreteTexto + '</span>';
        }
        infoEl.innerHTML = infoHtml;
    }

    // Aplicar cor de fundo se diferente de branco
    if (nota.cor && nota.cor !== '#ffffff') {
        var folha = document.querySelector('.ver-nota-folha');
        if (folha) {
            folha.style.backgroundColor = nota.cor;
        }
    }
}

// Auto resize textarea
function verNotaAutoResize(el) {
    el.style.height = 'auto';
    var minHeight = 400;
    el.style.height = Math.max(el.scrollHeight, minHeight) + 'px';
}

// Toggle modo edicao
function verNotaToggleEdicao() {
    _verNotaEditando = !_verNotaEditando;

    var tituloEl = document.getElementById('verNotaTitulo');
    var conteudoEl = document.getElementById('verNotaConteudo');
    var editBtn = document.getElementById('verNotaEditBtn');
    var salvarWrap = document.getElementById('verNotaSalvarWrap');

    if (_verNotaEditando) {
        // Ativar edicao
        if (tituloEl) {
            tituloEl.removeAttribute('readonly');
            tituloEl.classList.add('editando');
        }
        if (conteudoEl) {
            conteudoEl.removeAttribute('readonly');
            conteudoEl.classList.add('editando');
            conteudoEl.focus();
        }
        if (editBtn) editBtn.classList.add('ativo');
        if (salvarWrap) salvarWrap.classList.remove('ver-nota-hidden');
    } else {
        // Desativar edicao
        if (tituloEl) {
            tituloEl.setAttribute('readonly', true);
            tituloEl.classList.remove('editando');
        }
        if (conteudoEl) {
            conteudoEl.setAttribute('readonly', true);
            conteudoEl.classList.remove('editando');
        }
        if (editBtn) editBtn.classList.remove('ativo');
        if (salvarWrap) salvarWrap.classList.add('ver-nota-hidden');
    }
}

// Salvar nota editada
function verNotaSalvar() {
    if (!_verNotaId) return;

    var tituloEl = document.getElementById('verNotaTitulo');
    var conteudoEl = document.getElementById('verNotaConteudo');

    var titulo = tituloEl ? tituloEl.value.trim() : '';
    var conteudo = conteudoEl ? conteudoEl.value.trim() : '';

    if (!titulo && !conteudo) {
        alert('Preencha pelo menos o titulo ou conteudo.');
        return;
    }

    var notas = verNotaObterTodas();
    notas = notas.map(function(n) {
        if (n.id === _verNotaId) {
            n.titulo = titulo;
            n.conteudo = conteudo;
            n.editadoEm = Date.now();
        }
        return n;
    });

    verNotaSalvarTodas(notas);

    // Atualizar header
    var headerTitulo = document.getElementById('verNotaHeaderTitulo');
    if (headerTitulo) headerTitulo.textContent = titulo || 'Nota';

    // Desativar edicao
    verNotaToggleEdicao();

    // Recarregar info
    verNotaCarregar();
}

// Voltar para lista de notas
function verNotaVoltar() {
    if (typeof app !== 'undefined' && app.views && app.views.main) {
        app.views.main.router.back();
    } else {
        window.location.href = 'notas.html';
    }
}

// Inicializar
function inicializarVerNota() {
    verNotaCarregar();

    // Auto resize ao digitar
    var conteudoEl = document.getElementById('verNotaConteudo');
    if (conteudoEl) {
        conteudoEl.addEventListener('input', function() {
            verNotaAutoResize(this);
        });
    }
}

// Auto-inicializar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(inicializarVerNota, 200);
} else {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(inicializarVerNota, 200);
    });
}
