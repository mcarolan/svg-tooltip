var svg = null;

function getSubDocument(embedding_element)
{
  if (embedding_element.contentDocument) 
  {
    return embedding_element.contentDocument;
  } 
  else 
  {
    var subdoc = null;
    try {
      subdoc = embedding_element.getSVGDocument();
    } catch(e) {}
    return subdoc;
  }
}

window.onload = function() {
      svg = getSubDocument(document.getElementById('system-diagram')).documentElement;
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("viewBox", "0 0 3200 2400");

      $.getJSON("system-diagram-tooltip.json", function (data) {
        $.each(data, function (id, item) {
          var tooltip = item.tooltip;
          var githubProject = item.githubProject;

          svg.getElementById(id).onmouseenter = function () {
            $('#tooltip').html(tooltip);
            $('#tooltip').css("visibility",  "visible");
          }

          svg.getElementById(id).onmousemove = function (event) {
            $('#tooltip').css({
              "top": event.clientY,
              "left": event.clientX + 20});
          }

          svg.getElementById(id).onmouseleave = function (event) {
            $('#tooltip').css("visibility",  "collapse");
          }

          svg.getElementById(id).onmousedown = function (event) {
            window.location = githubProject;
          }
        });
      });
    };