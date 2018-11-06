# Filename: rsg.rb
# Authors: Blanche Pinto and My Nguyen
# Purpose: The “Random Sentence Generator” is a handy and marvelous piece of technology to create random sentences from a pattern known as a grammar.
# Date: 10/29/2018

# Extracts just the definitions from the grammar file
# Returns an array of strings where each string is the lines for a given definition (without the braces)
def read_grammar_defs(filename)
  filename = 'grammars/' + filename unless filename.start_with? 'grammars/'
  filename += '.g' unless filename.end_with? '.g'
  contents = open(filename, 'r') { |f| f.read }
  contents.scan(/\{(.+?)\}/m).map do |rule_array|
    rule_array[0]
  end
end

# Takes data as returned by read_grammar_defs and reformat it in the form of an array with the first element being the
# non-terminal and the other elements being the productions for that non-terminal.
# Remember that a production can be empty (see third example)

# Example:
#   split_definition "\n<start>\nYou <adj> <name> . ;\nMay <curse> . ;\n"
#     returns ["<start>", "You <adj> <name> .", "May <curse> ."]
#   split_definition "\n<start>\nYou <adj> <name> . ;\n;\n"
#     returns ["<start>", "You <adj> <name> .", ""]
def split_definition(raw_def)
  # TODO: your implementation here
  # Source URL: https://ruby-doc.org/core-2.1.4/String.html#method-i-gsub
  # Date pulled: 10/29/2018

  # word slicing [1..-1]
  # Source URL: https://usflearn.instructure.com/courses/1299559/pages/cool-ruby-i-used-in-rubyrsg?module_item_id=12488623
  # Date pulled: 10/29/2018

  # map grabs an element and use gsub
  # Source URL: https://stackoverflow.com/questions/16248853/how-to-use-rubys-gsub-function-to-replace-excessive-n-on-a-string
  # Date pulled: 10/29/2018

  # Source for regep: https://ruby-doc.org/core-2.2.0/Regexp.html
  # Date pulled: 10/31/2018
  # /\s matches a whitespace character

  # gsub searches for element starting whitespace and then other elements with ";" and replaces the match with a space
  raw_def.split(/\s*\n/)[1..-1].map{|e| e.gsub(/\s+/, ' ').gsub(/\s*;/, '')}
end

# Takes an array of definitions where the definitions have been processed by split_definition and returns a Hash that
# is the grammar where the key values are the non-terminals for a rule and the values are arrays of arrays containing
# the productions (each production is a separate sub-array)

# Example:
# to_grammar_hash([["<start>", "The   <object>   <verb>   tonight."], ["<object>", "waves", "big    yellow       flowers", "slugs"], ["<verb>", "sigh <adverb>", "portend like <object>", "die <adverb>"], ["<adverb>", "warily", "grumpily"]])
# returns {"<start>"=>[["The", "<object>", "<verb>", "tonight."]], "<object>"=>[["waves"], ["big", "yellow", "flowers"], ["slugs"]], "<verb>"=>[["sigh", "<adverb>"], ["portend", "like", "<object>"], ["die", "<adverb>"]], "<adverb>"=>[["warily"], ["grumpily"]]}
def to_grammar_hash(split_def_array)
  # TODO: your implementation here
  # Source URL: https://ruby-doc.org/core-2.1.4/Hash.html
  # Date pulled: 10/31/2018

  # create a hash by new -> new_hash
  result_hash = Hash.new

  # using the array of definitions processed by split_definition to go through each element and find the non-terminal key values
  split_def_array.each_entry {|e| result_hash[e[0]] = e[1..-1].map{|result_hash| result_hash.split(/\s/)}}

  # return results
  return result_hash
end

# Returns true iff s is a non-terminal a.k.a. a string where the first character is < and the last character is >
def is_non_terminal?(s)
  # TODO: your implementation here
  s[0] == "<" && s[-1] == ">"
end

# Given a grammar hash (as returned by to_grammar_hash) returns a string that is a randomly generated sentence from that grammar
# Once the grammar is loaded up, begin with the <start> production and expand it to generate a random sentence.
# Note that the algorithm to traverse the data structure and return the terminals is extremely recursive.
#
# The grammar will always contain a <start> non-terminal to begin the expansion.
# It will not necessarily be the first definition in the file, but it will always be defined eventually.
# Your code can assume that the grammar files are syntactically correct(i.e. have a start definition, have the correct
# punctuation and format # as described above, don't have some sort of endless recursive cycle in the
# expansion, etc.). The names of non-terminals should be considered case-insensitively, <NOUN> matches <Noun> and <noun>, for example.
def expand(grammar, non_term = "<start>")
  # TODO: your implementation here

  # sentence instantiation
  sen = ""

  # Source for fetch URL: https://stackoverflow.com/questions/16569409/fetch-vs-when-working-with-hashes
  # Date pulled: 10/31/2018

  # Source URL for random values: https://stackoverflow.com/questions/3482149/how-do-i-pick-randomly-from-an-array
  # Date pulled: 10/31/2018

  # create an array called senStruct to select a random value by fetch(key_name, default_value) and array.shuffle.first
  sen_struct = grammar.fetch(non_term, []).shuffle.first

  # Source for each URL: https://teamtreehouse.com/library/iteration-with-each
  # Date pulled: 10/31/2018

  # if random value is not empty
  if sen_struct != nil
    # search through each element in the array
    sen_struct.each do |e|
      # if element is not non-terminal the add the element to the string
      if !is_non_terminal?(e)
        sen = sen + e + " "
      # if element is non-terminal then expand the random values
      elsif is_non_terminal?(e)
        sen = sen + expand(grammar, e)
      end
    end
  end

  # Source URL for regexp: https://ruby-doc.org/core-2.2.0/Regexp.html
  # Source URL for gsub: https://stackoverflow.com/questions/18193424/using-gsub-in-ruby-strings-correctly
  # Date pulled: 10/31/2018

  # gsub searches for element with whitespace and replacing the match with a space
   sen.gsub(/\s(?=\.)|\s(?=\^)|\s(?=,)|(?<=\^)\s|\s(?=\?)|(?<=\()\s|\s(?=!)|\s(?=:)|\s(?=\))/, '')
end

# Given the name of a grammar file, read the grammar file and print a random expansion of the grammar
def rsg(filename)
  # TODO: your implementation here
  #  Source URL: https://ruby-doc.org/core-2.0.0/Hash.html
  #  Date pulled: 10/29/2018

  # 1. create a new array to hold the extracted data after read_grammar_defs has been called
  first_array = read_grammar_defs filename

  # 2. create a second array to hold map of all split data
  second_array = first_array.map{|e| split_definition e}

  # 3. create a hash array with the grammar where the key values are the non-terminals
  hash_array = to_grammar_hash second_array

  # 4. calls expand function on the hash array to output a randomly generated sentence from grammar
  puts expand hash_array
end

# Prompt the user for the name of a grammar file to start the random generator
if __FILE__ == $0
  # TODO: your implementation of the following

  # ask user for a file name
  puts "Please enter the file name: "

  # Source URL: https://learn.co/lessons/ruby-gets-input
  # Date pulled: 10/29/2018
  # gets.strip removes both whitespace and newline instead of gets.chomp
  filename = gets.strip

  # rsg that file
  rsg(filename)
end