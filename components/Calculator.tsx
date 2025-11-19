import React, { useState, useEffect, useCallback } from 'react';
import { ThemeConfig, HistoryItem } from '../types';
import { safeEvaluate, isValidInput } from '../utils/calculatorLogic';
import Button from './Button';
import Display from './Display';
import History from './History';

interface CalculatorProps {
  theme: ThemeConfig;
}

const Calculator: React.FC<CalculatorProps> = ({ theme }) => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScientific, setIsScientific] = useState(false);
  const [justCalculated, setJustCalculated] = useState(false);

  // Handle Inputs
  const handleInput = useCallback((val: string) => {
    if (justCalculated) {
      const isOperator = ['+', '-', '×', '÷', '^', '%'].includes(val);
      if (!isOperator) {
        setExpression(val);
        setResult('');
      } else {
        if (result && result !== 'Error') {
           setExpression(result + val);
           setResult('');
        } else {
           setExpression(val);
           setResult('');
        }
      }
      setJustCalculated(false);
      return;
    }

    if (!isValidInput(expression, val)) {
        return;
    }

    setExpression((prev) => prev + val);
  }, [expression, justCalculated, result]);

  const handleClear = useCallback(() => {
    setExpression('');
    setResult('');
    setJustCalculated(false);
  }, []);

  const handleBackspace = useCallback(() => {
    if (justCalculated) {
      handleClear();
      return;
    }
    setExpression((prev) => prev.slice(0, -1));
  }, [justCalculated, handleClear]);

  const handleEqual = useCallback(() => {
    if (!expression) return;

    const calcResult = safeEvaluate(expression);
    setResult(calcResult);
    setJustCalculated(true);
    if (calcResult !== 'Error') {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        expression: expression,
        result: calcResult,
        timestamp: Date.now(),
      };
      setHistory((prev) => [newItem, ...prev]);
    }
  }, [expression]);

  const handleScientificFunc = useCallback((func: string) => {
     if (justCalculated) {
         setExpression(func + '(');
         setResult('');
         setJustCalculated(false);
     } else {
         setExpression((prev) => prev + func + '(');
     }
  }, [justCalculated]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/^[0-9.]$/.test(key)) handleInput(key);
      else if (key === '+') handleInput('+');
      else if (key === '-') handleInput('-');
      else if (key === '*') handleInput('×');
      else if (key === '/') handleInput('÷');
      else if (key === '%') handleInput('%');
      else if (key === '^') handleInput('^');
      else if (key === 'Enter' || key === '=') { e.preventDefault(); handleEqual(); }
      else if (key === 'Backspace') handleBackspace();
      else if (key === 'Escape') handleClear();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput, handleEqual, handleBackspace, handleClear]);

  return (
    <div className={`relative z-10 w-full h-full sm:h-auto sm:aspect-[9/16] sm:max-h-[750px] mx-auto sm:rounded-[2.5rem] p-0 sm:p-1 sm:shadow-2xl transition-all duration-300 flex flex-col`}>
      {/* Backdrop effect container - hidden on mobile to save performance/space or customized */}
      <div className={`absolute inset-0 sm:rounded-[2.5rem] ${theme.glassBg} ${theme.glassBorder} border shadow-2xl -z-10`} />
      
      <div className="relative overflow-hidden sm:rounded-[2.2rem] p-4 h-full flex flex-col">
        
        <History 
          isOpen={isHistoryOpen} 
          history={history} 
          onClose={() => setIsHistoryOpen(false)} 
          onSelect={(item) => {
            setExpression(item.result);
            setResult('');
            setJustCalculated(true);
            setIsHistoryOpen(false);
          }}
          onClear={() => setHistory([])}
          theme={theme}
        />

        <Display 
          expression={expression} 
          result={result} 
          theme={theme} 
          historyOpen={isHistoryOpen}
          toggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        />

        {/* Keypad Area */}
        <div className="flex-1 flex flex-col justify-end min-h-0">
            
            <div className="flex justify-end mb-2 shrink-0">
                <button 
                    onClick={() => setIsScientific(!isScientific)}
                    className={`text-[10px] sm:text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${theme.buttonFunction}`}
                >
                    {isScientific ? 'Hide Advanced' : 'Show Advanced'}
                </button>
            </div>

            <div className={`grid gap-2 sm:gap-3 transition-all duration-300 ${isScientific ? 'grid-cols-5' : 'grid-cols-4'} h-full content-end`}>
              
              {isScientific && (
                <>
                    <Button label="sin" onClick={() => handleScientificFunc('sin')} className={theme.buttonFunction} variant="function" />
                    <Button label="cos" onClick={() => handleScientificFunc('cos')} className={theme.buttonFunction} variant="function" />
                    <Button label="tan" onClick={() => handleScientificFunc('tan')} className={theme.buttonFunction} variant="function" />
                    <Button label="log" onClick={() => handleScientificFunc('log')} className={theme.buttonFunction} variant="function" />
                    <Button label="ln" onClick={() => handleScientificFunc('ln')} className={theme.buttonFunction} variant="function" />
                </>
              )}

               {isScientific && (
                <>
                    <Button label="(" onClick={() => handleInput('(')} className={theme.buttonFunction} variant="function" />
                    <Button label=")" onClick={() => handleInput(')')} className={theme.buttonFunction} variant="function" />
                    <Button label="^" onClick={() => handleInput('^')} className={theme.buttonFunction} variant="function" />
                    <Button label="√" onClick={() => handleScientificFunc('√')} className={theme.buttonFunction} variant="function" />
                    <Button label="!" onClick={() => handleInput('!')} className={theme.buttonFunction} variant="function" />
                </>
               )}

               {isScientific && (
                 <>
                    <Button label="π" onClick={() => handleInput('π')} className={theme.buttonFunction} variant="function" />
                    <Button label="e" onClick={() => handleInput('e')} className={theme.buttonFunction} variant="function" />
                    <Button label="1/x" onClick={() => expression && setExpression(`1/(${expression})`)} className={theme.buttonFunction} variant="function" />
                    <Button label="|x|" onClick={() => expression && setExpression(`Math.abs(${expression})`)} className={theme.buttonFunction} variant="function" />
                    <Button label="exp" onClick={() => handleInput('e^')} className={theme.buttonFunction} variant="function" />
                 </>
               )}

              <Button label="AC" onClick={handleClear} className={`${theme.buttonFunction} font-semibold`} variant="function" />
              <Button label="⌫" onClick={handleBackspace} className={theme.buttonFunction} variant="function" />
              <Button label="%" onClick={() => handleInput('%')} className={theme.buttonFunction} variant="function" />
              <Button label="÷" onClick={() => handleInput('÷')} className={theme.buttonOperator} variant="operator" />

              <Button label="7" onClick={() => handleInput('7')} className={theme.buttonBase} />
              <Button label="8" onClick={() => handleInput('8')} className={theme.buttonBase} />
              <Button label="9" onClick={() => handleInput('9')} className={theme.buttonBase} />
              <Button label="×" onClick={() => handleInput('×')} className={theme.buttonOperator} variant="operator" />

              <Button label="4" onClick={() => handleInput('4')} className={theme.buttonBase} />
              <Button label="5" onClick={() => handleInput('5')} className={theme.buttonBase} />
              <Button label="6" onClick={() => handleInput('6')} className={theme.buttonBase} />
              <Button label="-" onClick={() => handleInput('-')} className={theme.buttonOperator} variant="operator" />

              <Button label="1" onClick={() => handleInput('1')} className={theme.buttonBase} />
              <Button label="2" onClick={() => handleInput('2')} className={theme.buttonBase} />
              <Button label="3" onClick={() => handleInput('3')} className={theme.buttonBase} />
              <Button label="+" onClick={() => handleInput('+')} className={theme.buttonOperator} variant="operator" />

              <Button 
                label="0" 
                onClick={() => handleInput('0')} 
                className={theme.buttonBase} 
                colSpan={isScientific ? 1 : 2} 
              />
              {isScientific && (
                 <Button label="±" onClick={() => {
                     if(expression && !expression.endsWith(')')) setExpression(`-(${expression})`);
                 }} className={theme.buttonBase} />
              )}

              <Button label="." onClick={() => handleInput('.')} className={theme.buttonBase} />
              
              <Button 
                label="=" 
                onClick={handleEqual} 
                className={`${theme.buttonEqual} font-bold text-xl sm:text-2xl`} 
                variant="equal" 
                colSpan={isScientific ? 2 : 1}
              />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;