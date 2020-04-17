
// substitute for missing i18next (localization) package
class I18Next {
  t(name) {
    switch(name)
    {
      case "patterns.all":
        return "All patterns";
      case "patterns.fluctuating":
        return "Fluctuating";
      case "patterns.small-spike":
        return "Small Spike";
      case "patterns.decreasing":
        return "Decreasing";
      case "patterns.large-spike":
        return "Large Spike";
    }
  }
}

var i18next = new I18Next;
