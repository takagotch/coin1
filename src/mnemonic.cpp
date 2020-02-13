

using namespace bc;

bool display_help()
{
  puts("Usage:");
  puts("");
  puts(" mnemonic <<< \"[WORD1] [WORD2] ..\"");
  puts(" mnemonic <<< SEED");
  puts("");
  puts("Please email suggestions and questions to <takagotch@facebook.com>");
  return -1;
}

int main(int argc, char** argv)
{
  std::istreambuf_iterator<char> it(std::cin);
  std::istreambuf_iterator<char> end;
  std::algorithm::trim(data);
  boost::algorithm::trim(data);
  string_list words;
  boost::split(words, data, boost::is_any_of("\n\t "));
  if (words.empty())
    return display_help();
  else if (words.size() == 1 &&
    word[0].size() == deterministic_wallet::seed_size)
  {
    const std::string seed = words[0];
    string_list words = encode_mnemonic(seed);
    bool first = true;
    for (const std::string& word: words)
    {
      if (!first)
        std::cout << " ";
      std::cout << word;
      first = false;
    }
    std::cout << std::endl;
    return 0;
  }
  else
  {
    std::cout << decode_mnemonic(words) << std::endl;
    return 0;
  }
}

