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
    CH10OAC1: {
      title: `Chapter 10, <span className="whitespace-nowrap">Challenge 1</span>`,
      welcome: 'Welcome! The challenge has already been completed.',
      tips: 'No tips needed for this challenge',
    },
    CH10OAC2: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 1</span>',
      welcome: `You are creating an off-chain Bitcoin transaction where you're sending 1000 satoshis to Laszlo, in exchange for a beer, without broadcasting the transaction to the network.`,
      tips: `
       For each output, you'll need to lock the funds using a simple public key verification. 
       <br/> <br/>
       For Laszlo’s output, make sure the transaction can only be spent if Laszlo provides his public key. 
       <br/> <br/>
       Similarly, for your change output, it should require your public key to be spent.
      `,
      initial_stack_one:
        'Laszlo spends output 0 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(LASZLO)</span>',
      initial_stack_two:
        'You spend output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU)</span>',
    },
    CH10OAC4: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 1</span>',
      welcome: `Welcome! In this challenge, you’ll create a 2-of-2 multisignature transaction. Both you and Laszlo need to sign to spend the funds. Let’s get started!`,
      tips: `
      For this transaction, you'll need to set up a system where both you and Laszlo have to approve any spending. This means two public keys (yours and Laszlo's) will be included, and both signatures are required to unlock the funds.
      `,
      initial_stack_one:
        'You and Laszlo want to work together in the future to spend output 0 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(LASZLO) SIG(YOU)</span>',
    },
    CH10UTS1: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 2</span>',
      welcome: `Welcome! In this challenge, you'll create a refund transaction from the multisig output. You'll fill in the output amount, write the output script, and send it to Laszlo for his approval. Let's see if he’s willing to sign it!`,
      tips: `
 This transaction ensures funds are not lost if Laszlo disappears.
 <br/>
 Output 0 is spent by you with SIG(YOU).
    `,
      initial_stack_one:
        'Output 0 is spent by you with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU)</span>',
    },
    CH10UTS3: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 2</span>',
      welcome: `Welcome! In this challenge, you'll create a revocable transaction, allowing Laszlo to spend the output if he also has a special revocation key you generate. Your task is to add the necessary condition and then send the transaction to Laszlo for his signature.`,
      tips: `You’ll need to add an additional condition that gives Laszlo control of the output, but only if he also possesses the revocation key.`,
      initial_stack_one:
        'You spend output 0 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU) 1</span>',
      initial_stack_two:
        'Laszlo spends output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(REVOCATION_YOU_1) SIG(LASZLO) 0</span>',
    },

    CH10UTS5: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 2</span>',
      welcome: `Welcome! In this challenge, you’ll create a transaction that ensures funds are safe if Laszlo disappears and also reassures him that you won’t broadcast the transaction after paying for your beer. Laszlo will have a few days to act if you do`,
      tips: `You’ll need to set up conditions that give Laszlo the ability to revoke the transaction if necessary.
      <br /> <br />
      This creates a safeguard for both of you, protecting the funds while also allowing Laszlo time to respond if the transaction is broadcast.
      `,
      initial_stack_one:
        'You spend output 0 after 700 blocks with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU) 1</span>',
      initial_stack_two:
        'Laszlo spends output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(REVOCATION_YOU_1) SIG(LASZLO) 0</span>',
    },
    CH10MAP2: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 3</span>',
      welcome: `Welcome! It's time to buy Laszlo a beer off-chain! You'll update the commitment transaction to send him 1,000 satoshis. You’ll also generate a revocation key to ensure you can repeat the process for future beers. Let’s get started`,
      tips: `You’ll need to set up conditions that give Laszlo the ability to revoke the transaction if necessary.
    <br /> <br />
    Ensure Laszlo can spend his output immediately, while you’ll have to wait 700 blocks unless you revoke the transaction.
    `,
      initial_stack_one:
        'You spend output 0 after 700 blocks with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU) 1</span> or Laszlo can spend it with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(REVOCATION_YOU_2) SIG(LASZLO) 0</span>',
      initial_stack_two:
        'Laszlo spends output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(LASZLO)</span>',
    },
    CH10MAP5: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 3</span>',
      welcome: `Welcome! It's time to buy Laszlo a beer off-chain! You'll update the commitment transaction to send him 1,000 satoshis. You’ll also generate a revocation key to ensure you can repeat the process for future beers. Let’s get started`,
      tips: `You’ll need to set up conditions that give Laszlo the ability to revoke the transaction if necessary.
    <br /> <br />
    Ensure Laszlo can spend his output immediately, while you’ll have to wait 700 blocks unless you revoke the transaction.
    `,
      initial_stack_one:
        'Laszlo spends output 0 after 700 blocks with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(LASZLO) 1</span> or Laszlo can spend it with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(REVOCATION_LASZlO_1) SIG(YOU) 0</span>',
      initial_stack_two:
        'You spend output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU)</span>',
    },
    CH10MAP6: {
      title: `Chapter 10, <span className="whitespace-nowrap">Challenge 2</span>`,
      welcome: 'Welcome! The challenge has already been completed.',
      tips: 'No tips needed for this challenge',
    },
    CH10MAP8: {
      title:
        'Chapter 10, <span className="whitespace-nowrap">Challenge 3</span>',
      welcome: `Welcome! Time for another beer! You and Laszlo have your asymmetrical transactions in place, and now it’s time to make another payment of 1,000 satoshis. Update the amounts, run the revocation protocol, and enjoy another round.`,
      tips: `Adjust the outputs so Laszlo gets another 1,000 satoshis.
    <br /> <br />
   Remember to exchange revocation keys to ensure previous transactions can’t be broadcasted.
    `,
      initial_stack_one:
        'You spend output 0 after 700 blocks with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(YOU) 1</span> or Laszlo can spend it with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">0 SIG(REVOCATION_YOU_3) SIG(LASZLO) 0</span>',
      initial_stack_two:
        'Laszlo spends output 1 with <span className="rounded-sm px-1.5 py-1 h-[28px] font-mono bg-[#0000004D] m-0.5 text-base whitespace-nowrap">SIG(LASZLO)</span>',
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
