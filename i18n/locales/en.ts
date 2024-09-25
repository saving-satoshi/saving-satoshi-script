const translations = {
  homepage: {
    title: 'Bitcoin script',
    welcome:
      'Welcome to the bitcoin script editor & visualizer. This is your playground for learning and experimentation.',
    examples_list: {
      heading: 'Try out some examples:',
      basic: 'Basic transaction',
      multi_sig: 'Multi-sig transaction',
      timelock: 'Timelocked transaction',
    },
    links_list: {
      heading: 'Helpful links:',
      introduction: 'Introduction to bitcoin script',
      documentation: 'OP_CODE documentation',
      saving_satoshi: 'Learn bitcoin script in Saving Satoshi',
      github: 'View the source code & contribute',
    },
    abstractions_list: {
      heading: 'Notable abstractions',
    },
  },
  lesson: {
    OAC2: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 2</span>',
      welcome:
        "Alright, you're here to write a script that ensures Lazlo cannot run away with the funds in your lightning channel.",
      tips: 'Helpful; tips for OAC2',
    },
  },
  shared: {
    next: 'Continue',
  },
  opcode: {
    run: 'Run the script',
  },
  status_bar: {
    in_progress_message: 'Computing',
    error_message: 'Hmm... It looks like this script did not validate',
    success_message: 'Nice! this script validated successfully',
  },
}

export default translations
