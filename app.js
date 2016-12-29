angular.module('wordsApp', [])
  .controller('MainCtrl', function($scope) {
    $scope.m_text = 'Sam was a dog. In a house was a dog named Sam. Sam was a fast dog in a house. In the kitchen of the house was Sam, the fast dog. And Kitty the cat. Kitty and Sam were eating with June. In the kitchen. In a house. The house of June, Sam and Kitty was in the country.';
    //$scope.m_text = 'Sam was a god.';
    console.log('MainCtrl has been created');

    $scope.$watch("m_text", function(m_new, m_old) {
      var m_words = m_new;
      var lastChar = m_words.substr(m_words.length - 1);
      var result = /^[ .,!?\n]$/.test(lastChar);
      //console.log(result);
      if (result) {
        m_words = m_words.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\'\"?¿¡—]/g,'');
        m_words = m_words.split(/[\s.]+/);
        m_words = _.filter(m_words, function(word) { return word });
        m_words = _.filter(m_words, function(word) { return word.length > 1 })
        m_words = _.map(m_words, function(word) { return word.toLowerCase(); })
        var m_words_counted = _.countBy(m_words);
        var m_words_array = [];
        _.each(_.keys(m_words_counted).sort(), function(m_word) {
          m_words_array.push({ word: m_word, count: m_words_counted[m_word]})
        });
        $scope.m_words = m_words_array;
      }
    });
  });
