---
title: {{ replace .Name "-" " " | title }}
description: 
date: {{ .Date }}
categories: 
tags: ['']
image: 
slug: {{ substr (md5 (printf "%s%s" .Date (replace .TranslationBaseName "-" " " | title))) 4 8 }}
draft: true
---
